package com.team7.campusdiscoveryservice;

import com.team7.campusdiscoveryservice.entity.User;
import com.team7.campusdiscoveryservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CampusDiscoveryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampusDiscoveryServiceApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;
}
