package com.bknote71.basicwebsocketrobocode.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@Configuration
@RequiredArgsConstructor
@EnableWebSocket
public class SecurityConfiguration {

    private static final String[] permitAllResources = {"/login", "/logout",  "/signup", "/h2-console/**", "/battle/*"};

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors().disable();
        http.authorizeRequests()
                .antMatchers(permitAllResources).permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin();
        return http.build();
    }

}
