package group9.events.service.interfaces;


import group9.events.domain.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface UserService extends UserDetailsService {

    void register(User user);

    String confirmRegistration(String confirmCode);

    void login(User user);

    List<User> getAllUsers();

    void transferAdminRole(Long id);

    void blockUser(Long id);

    void registrationConfirm(String code);

}
