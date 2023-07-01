package pro.porbes.birdiebuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"data.*","naver.cloud"})
public class BirdieBuddyApplication {

    public static void main(String[] args) {
        SpringApplication.run(BirdieBuddyApplication.class, args);
    }

}
