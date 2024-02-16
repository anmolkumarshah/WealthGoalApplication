package com.virtusa.WealthsApp;

import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Advisor;
import com.virtusa.WealthsApp.service.AdvisorUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@SpringBootApplication
public class WealthsAppApplication implements CommandLineRunner {
	@Autowired
	AdvisorUserService userService;
	@Autowired
	PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(WealthsAppApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		// Advisor have to start with "advisor"

		if (initialDataAlreadySaved()) {
			// Advisor have to start with "advisor"

			Advisor advisor1 = new Advisor();
			advisor1.setEmail("advisor1@g.com");
			advisor1.setPassword(passwordEncoder.encode("test123"));
			advisor1.setName("John Doe");
			advisor1.setPhone("1234567890");
			advisor1.setEndUsers(Collections.emptyList());

			Advisor advisor2 = new Advisor();
			advisor2.setPhone("0987654321");
			advisor2.setEmail("advisor2@g.com");
			advisor2.setPassword(passwordEncoder.encode("test123"));
			advisor2.setName("Jane Anderson");
			advisor2.setEndUsers(Collections.emptyList());

			userService.save(advisor1);
			userService.save(advisor2);

			// Set the flag indicating that the initial data has been saved
		}
	}

	private boolean initialDataAlreadySaved() {
		try {
			Advisor byEmailId = userService.getByEmailId("advisor1@g.com");
			if(byEmailId != null){
				return false;
			}else{
				return true;
			}
		} catch (UserNotFoundException e) {
			return true;
		}
	}

}
