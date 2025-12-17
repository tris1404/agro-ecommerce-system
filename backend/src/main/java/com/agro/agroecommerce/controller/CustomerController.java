package com.agro.agroecommerce.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER', 'ROLE_ADMIN')")
    public String customerProfile(Authentication authentication) {
        return "Customer Profile - Accessible by ROLE_CUSTOMER and ROLE_ADMIN. User: " + authentication.getName();
    }

    @GetMapping("/orders")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER', 'ROLE_ADMIN')")
    public String customerOrders() {
        return "Customer Orders - Accessible by ROLE_CUSTOMER and ROLE_ADMIN";
    }
}
