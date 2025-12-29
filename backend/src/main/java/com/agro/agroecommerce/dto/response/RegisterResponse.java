package com.agro.agroecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponse {
    private Long id;
    private String username;
    private String email;
    private String message;

    // Constructor without message (message will be set to default)
    public RegisterResponse(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.message = "User registered successfully";
    }
}
