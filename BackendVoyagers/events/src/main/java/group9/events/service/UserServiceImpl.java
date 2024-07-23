package group9.events.service;

import group9.events.domain.entity.Role;
import group9.events.domain.entity.User;
import group9.events.exception_handler.exceptions.UserAlreadyExistsException;
import group9.events.exception_handler.exceptions.UserNotFoundException;
import group9.events.repository.RoleRepository;
import group9.events.repository.UserRepository;
import group9.events.service.interfaces.ConfirmationService;
import group9.events.service.interfaces.EmailService;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder;
    private final EmailService emailService;
    private final RoleService roleService;
    private final ConfirmationService confirmationService;

    @Autowired
    public UserServiceImpl(UserRepository repository, RoleService roleService, EmailService emailService, BCryptPasswordEncoder encoder, ConfirmationService confirmationService) {
        this.repository = repository;
        this.roleService = roleService;
        this.emailService = emailService;
        this.encoder = encoder;
        this.confirmationService = confirmationService;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException(String.format("User %s not found", username))
        );
    }


    //TODO after Validation make Exception
    @Override
    public void register(User user) {
        String username = user.getUsername();
        User existedUser = repository.findByEmail(username).orElse(null);

        if (existedUser != null && existedUser.getActive()) {
            throw new RuntimeException("User already exists");
        }

        if (existedUser == null) {
            existedUser = new User();
            existedUser.setEmail(username);
            existedUser.setRoles(Set.of(roleService.getRoleUser()));
        }

        existedUser.setPassword(encoder.encode(user.getPassword()));
        existedUser.setEmail(user.getEmail());

        repository.save(existedUser);
        emailService.sendConfirmationEmail(existedUser);

//        try {
//            repository.save(user);
//            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        } catch (DataIntegrityViolationException exception) {
//            throw new UserAlreadyExistsException("User with that name already exists");
//        }

    }

    @Override
    @Transactional
    public void registrationConfirm(String code) {
        User user = confirmationService.getUserByConfirmationCode(code);
        user.setActive(true);
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
