package group9.events.security.security_config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig  {

    @Bean
    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .httpBasic(Customizer.withDefaults())
                .authorizeHttpRequests(authz -> authz
                        .anyRequest().permitAll()
//                        // Разрешить доступ к эндпоинтам регистрации и авторизации
//                        .requestMatchers(HttpMethod.POST, "/users/register").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/users/login").permitAll()
//                        // Другие эндпоинты требуют аутентификации
//                        .requestMatchers(HttpMethod.GET, "/events/active").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/events/archive").hasAnyRole("ADMIN","USER")
//                        .anyRequest().authenticated()
                )
                .build();
    }
}
