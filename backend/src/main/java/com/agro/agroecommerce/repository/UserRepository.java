package com.agro.agroecommerce.repository;

import org.springframework.data.repository.CrudRepository;
import com.agro.agroecommerce.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationCode(String verificationCode);
}
