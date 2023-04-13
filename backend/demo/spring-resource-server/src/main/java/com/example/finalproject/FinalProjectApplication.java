package com.example.finalproject;

import com.example.finalproject.ENUM.EROLE;
import com.example.finalproject.config.UserLoginProperties;
import com.example.finalproject.entity.Role;
import com.example.finalproject.repository.RoleRepository;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(UserLoginProperties.class)
public class FinalProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalProjectApplication.class, args);
	}

	@Bean
	Faker faker() {
		return new Faker();
	}
	@Bean
	public CommandLineRunner initialValue(RoleRepository roleRepository) {
		return (args -> {
			if (!roleRepository.findByName(EROLE.ROLE_USER).isPresent()) {
				roleRepository.save(new Role("ROLE_USER"));
			};
			if (!roleRepository.findByName(EROLE.ROLE_ADMIN).isPresent()) {
				roleRepository.save(new Role("ROLE_ADMIN"));
			};
			if (!roleRepository.findByName(EROLE.ROLE_GUEST).isPresent()) {
				roleRepository.save(new Role("ROLE_GUEST"));
			};
		});

	}
}
