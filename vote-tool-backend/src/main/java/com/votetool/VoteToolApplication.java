package com.votetool;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class VoteToolApplication {
    public static void main(String[] args) {
        SpringApplication.run(VoteToolApplication.class, args);
    }

    @Configuration
    public static class WebConfig extends WebMvcConfigurerAdapter {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry
                .addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins("http://localhost:4200");
        }
    }
}
