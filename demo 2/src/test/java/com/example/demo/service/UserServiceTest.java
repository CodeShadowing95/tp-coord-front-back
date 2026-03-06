package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository mockUserRepository;

    @Test
    public void testUserNotExists() {
        // Arrange
        String username = "username";
        UserService userService = new UserService(mockUserRepository);
        when(mockUserRepository.findByUsername(username)).thenReturn(Optional.empty());

        // Act
        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername(username));

        // Assert
        verify(mockUserRepository).findByUsername(username);
    }

    @Test
    public void testLoadUserByUsername() {

        // Arrange
        String username = "username";
        UserService userService = new UserService(mockUserRepository);
        Role role = new Role();
        role.setName("USER");
        User mockUser = new User();
        mockUser.setId(1L);
        mockUser.setUsername(username);
        mockUser.setPassword("password");
        mockUser.getRoles().add(role);
        when(mockUserRepository.findByUsername(username)).thenReturn(Optional.of(mockUser));

        // Act
        UserDetails userDetails = userService.loadUserByUsername(username);

        // Assert
        assert userDetails != null
                && userDetails.getUsername().equals(username)
                && userDetails.getPassword().equals("password");

                List<String> roles = userDetails.getAuthorities().stream().map(auth -> auth.getAuthority()).toList();
                assert roles.contains("ROLE_USER"); // Vérification que le rôle "USER" est présent

                verify(mockUserRepository).findByUsername(username); // Vérification que le mock a été appelé avec le bon username

    }

}
