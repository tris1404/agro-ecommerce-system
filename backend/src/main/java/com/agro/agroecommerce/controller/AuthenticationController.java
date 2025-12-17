package com.agro.agroecommerce.controller;

import com.agro.agroecommerce.dto.LoginUserDto;
import com.agro.agroecommerce.dto.RegisterUserDto;
import com.agro.agroecommerce.dto.VerifyUserDto;
import com.agro.agroecommerce.dto.response.AuthResponse;
import com.agro.agroecommerce.entity.RefreshToken;
import com.agro.agroecommerce.entity.User;
import com.agro.agroecommerce.exception.TokenRefreshException;
import com.agro.agroecommerce.service.AuthenticationService;
import com.agro.agroecommerce.service.JwtService;
import com.agro.agroecommerce.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;

    public AuthenticationController(
            JwtService jwtService, 
            AuthenticationService authenticationService,
            RefreshTokenService refreshTokenService
    ) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(
            @RequestBody LoginUserDto loginUserDto,
            HttpServletResponse response
    ) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        
        // Generate access token
        String accessToken = jwtService.generateAccessToken(authenticatedUser);
        
        // Generate refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(authenticatedUser.getId());
        
        // Set refresh token in HttpOnly cookie
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken.getToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true); // Set to true in production with HTTPS
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        response.addCookie(refreshTokenCookie);
        
        AuthResponse authResponse = new AuthResponse(
                accessToken,
                jwtService.getAccessTokenExpiration(),
                authenticatedUser.getUsername(),
                authenticatedUser.getEmail()
        );
        
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        try {
            // Extract refresh token from cookie
            String refreshToken = null;
            if (request.getCookies() != null) {
                refreshToken = Arrays.stream(request.getCookies())
                        .filter(cookie -> "refreshToken".equals(cookie.getName()))
                        .findFirst()
                        .map(Cookie::getValue)
                        .orElse(null);
            }
            
            if (refreshToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Refresh token is missing");
            }
            
            // Find and verify refresh token
            RefreshToken token = refreshTokenService.findByToken(refreshToken)
                    .orElseThrow(() -> new TokenRefreshException("Refresh token not found"));
            
            token = refreshTokenService.verifyExpiration(token);
            
            User user = token.getUser();
            
            // Generate new access token
            String newAccessToken = jwtService.generateAccessToken(user);
            
            AuthResponse authResponse = new AuthResponse(
                    newAccessToken,
                    jwtService.getAccessTokenExpiration(),
                    user.getUsername(),
                    user.getEmail()
            );
            
            return ResponseEntity.ok(authResponse);
            
        } catch (TokenRefreshException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            // Extract refresh token from cookie
            String refreshToken = null;
            if (request.getCookies() != null) {
                refreshToken = Arrays.stream(request.getCookies())
                        .filter(cookie -> "refreshToken".equals(cookie.getName()))
                        .findFirst()
                        .map(Cookie::getValue)
                        .orElse(null);
            }
            
            if (refreshToken != null) {
                // Revoke the refresh token
                refreshTokenService.revokeToken(refreshToken);
            }
            
            // Clear the refresh token cookie
            Cookie refreshTokenCookie = new Cookie("refreshToken", null);
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setSecure(true);
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(0);
            response.addCookie(refreshTokenCookie);
            
            return ResponseEntity.ok("Logged out successfully");
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during logout");
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}