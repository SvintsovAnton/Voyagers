package group9.events.security.sec_controller;

import group9.events.domain.entity.User;
import group9.events.security.sec_dto.RefreshRequestDto;
import group9.events.security.sec_dto.TokenResponseDto;
import group9.events.security.sec_service.AuthService;
import jakarta.security.auth.message.AuthException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public TokenResponseDto login(@RequestBody User user) {
        try {
            return service.login(user);
        } catch (AuthException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/refresh")
    public TokenResponseDto getNewAccessToken(@RequestBody RefreshRequestDto request) {
        try {
            return service.getNewAccessToken(request.getRefreshToken());
        } catch (AuthException e) {
            throw new RuntimeException(e);
        }
    }
}