package com.example.demo.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

// @SpringBootTest // Annotation pour indiquer que c'est un test Spring Boot, mais on n'en a pas besoin ici car on utilise Mockito pour le test unitaire
@ExtendWith(MockitoExtension.class) // Extension pour utiliser Mockito dans les tests
public class TokenServiceTest {

    // @Autowired
    // private TokenService tokenService;

    @Mock
    private JwtEncoder mockJwtEncoder; // Création du mock

    @Test
    public void testGenerateToken() {

        // Arrange
        TokenService tokenService = new TokenService(mockJwtEncoder); // Injection du mock dans le service

        Map<String, Object> fakeMap = new HashMap<String, Object>();
        fakeMap.put("fake", "fake");

        Jwt jwt = new Jwt("token", Instant.now(), Instant.now().plus(1, ChronoUnit.DAYS), fakeMap, fakeMap);
        when(mockJwtEncoder.encode(any(JwtEncoderParameters.class))).thenReturn(jwt); // Définition du comportement du mock

        UsernamePasswordAuthenticationToken auth = 
            new UsernamePasswordAuthenticationToken("username", "password");

        // Act
        String token = tokenService.generateToken(auth); // Le mock sera utilisé ici pour encoder le token

        // Assert
        assert token != null
                && !token.isEmpty()
                && String.class.isInstance(token)
                && token.equals("token");

        verify(mockJwtEncoder).encode(any()); // Vérification que le mock a été appelé avec n'importe quelle instance de JwtEncoderParameters

    }

}
