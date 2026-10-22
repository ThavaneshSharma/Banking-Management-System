package iocode.web.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("iocode.web.app.entity")
@EnableJpaRepositories("iocode.web.app.repository")
public class IobankApplication {

	public static void main(String[] args) {
		SpringApplication.run(IobankApplication.class, args);
	}

}
