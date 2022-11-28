package com.team7.campusdiscoveryservice;

import com.team7.campusdiscoveryservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
public class CampusDiscoveryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampusDiscoveryServiceApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;
}
