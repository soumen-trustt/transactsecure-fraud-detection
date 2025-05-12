package com.soumen.transactsecure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class NoMailConfig {
    @Bean
    public JavaMailSender javaMailSender() {
        return new JavaMailSenderImpl(); // dummy, won't send real mail
    }
}
