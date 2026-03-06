package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Note;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.NoteRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;

@Component
public class UserInitializator implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private NoteRepository noteRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	@Transactional
	public void run(String... args) throws Exception {

		Role userRole = new Role();
		userRole.setName("USER");

		Role adminRole = new Role();
		adminRole.setName("ADMIN");

		User defaultUser = new User();
		defaultUser.setUsername("user");
		defaultUser.setPassword(bCryptPasswordEncoder.encode("password"));
		defaultUser.addRole(userRole);

		User defaultAdmin = new User();
		defaultAdmin.setUsername("admin");
		defaultAdmin.setPassword(bCryptPasswordEncoder.encode("password"));
		defaultAdmin.addRole(adminRole);

		defaultUser = userRepository.save(defaultUser);

		defaultAdmin.addRole(defaultUser.getRoles().get(0));
		userRepository.save(defaultAdmin);

		// Add seed notes
		// Note note1 = new Note();
		// note1.setTitle("Bienvenue sur Springnote");
		// note1.setContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie at ante vel placerat. Duis mollis magna sed suscipit faucibus.");
		// noteRepository.save(note1);
	}

}
