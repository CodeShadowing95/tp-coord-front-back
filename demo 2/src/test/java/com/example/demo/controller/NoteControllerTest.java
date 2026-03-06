package com.example.demo.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.example.demo.model.Note;
import com.fasterxml.jackson.databind.ObjectMapper;

@ActiveProfiles("test") // Annotation pour indiquer que ce test doit utiliser le profil "test" défini dans application-test.properties, qui configure une base de données H2 en mémoire pour les tests
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class NoteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser // Annotation pour simuler un utilisateur authentifié, nécessaire si les endpoints sont sécurisés
    public void testGetAll() throws Exception {

        // mockMvc.perform(get("/notes"))
        //        .andExpect(status().isOk());
        mockMvc.perform(get("/notes"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(3)));
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_USER")
    public void testCreateNote() throws Exception {
        Note mockNote = new Note();
        mockNote.setTitle("New Note");
        mockNote.setContent("This is a new note.");

        ObjectMapper objectMapper = new ObjectMapper();
        String noteJson = objectMapper.writeValueAsString(mockNote);

        mockMvc.perform(post("/notes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(noteJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New Note"))
                .andExpect(jsonPath("$.content").value("This is a new note."));
    }
}
