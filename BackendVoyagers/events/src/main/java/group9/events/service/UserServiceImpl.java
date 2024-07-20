package group9.events.service;

import group9.events.domain.entity.Role;
import group9.events.domain.entity.User;
import group9.events.exception_handler.exceptions.UserAlreadyExistsException;
import group9.events.exception_handler.exceptions.UserNotFoundException;
import group9.events.repository.RoleRepository;
import group9.events.repository.UserRepository;
import group9.events.service.interfaces.RoleService;
import group9.events.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder;

    private final RoleService roleService;

    @Autowired
    public UserServiceImpl(UserRepository repository, BCryptPasswordEncoder encoder, RoleService roleService) {
        this.repository = repository;
        this.encoder = encoder;
        this.roleService = roleService;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException("User with this name not found"));
    }

//TODO after Validation make Exception
    @Override
    public void register(User user) throws UserAlreadyExistsException {
        user.setId(null);
        user.setPassword(encoder.encode(user.getPassword()));
        Role userRole = roleService.getRoleUser();
        user.setRoles(Set.of(userRole));
        user.setActive(true);
        try {
            repository.save(user);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (DataIntegrityViolationException exception){
            throw new UserAlreadyExistsException("User with that name already exists");
        }

    }

    @Override
    public String confirmRegistration(String confirmCode) {
        return null;
    }

    @Override
    public void login(User user) {
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public void transferAdminRole(Long id) {
        User user = repository.findById(id).orElse(null);
        if (user != null) {
           roleService.getRoleAdmin();
        }
    }

    @Override
    public void blockUser(Long id) {
        User user = repository.findById(id).orElse(null);
        if (user != null) {
            user.setActive(false);
            repository.save(user);
        }
    }

}
