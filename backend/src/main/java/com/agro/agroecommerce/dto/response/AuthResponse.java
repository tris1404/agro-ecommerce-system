package com.agro.agroecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Long expiresIn;
    private String username;
    private String email;

    public AuthResponse(String accessToken, Long expiresIn, String username, String email) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.username = username;
        this.email = email;
    }
}
