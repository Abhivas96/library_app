package com.Abhishek.library_backend.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:3000")
@Configuration
public class SecurityConfiguration {
        @Bean
        protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

            //protect endpoint /api/orders
            http.authorizeHttpRequests(requests ->
                            requests
                                    .requestMatchers("/api/books/secure/**",
                                            "/api/reviews/secure/**",
                                            "/api/messages/secure/**",
                                            "/api/admin/secure/**")
                                    .authenticated()
                                    .anyRequest().permitAll())
                    .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer.jwt(Customizer.withDefaults()));

            // + CORS filters
            http.cors(Customizer.withDefaults());

            // + content negotiation strategy
            http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

            // + non-empty response body for 401 (more friendly)
            Okta.configureResourceServer401ResponseBody(http);

            // we are not using Cookies for session tracking >> disable CSRF
            http.cors(Customizer.withDefaults());

            return http.build();
    }

}