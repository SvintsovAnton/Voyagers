package group9.events.service;

import group9.events.domain.dto.UserDto;
import group9.events.domain.entity.Role;
import group9.events.domain.entity.User;
import group9.events.exception_handler.exceptions.UserAlreadyExistsException;
import group9.events.exception_handler.exceptions.UserNotFoundException;
import group9.events.repository.EventUsersRepository;
import group9.events.repository.UserRepository;
import group9.events.service.interfaces.ConfirmationService;
import group9.events.service.interfaces.EmailService;
import group9.events.service.interfaces.RoleService;
import group9.events.service.interfaces.UserService;
import group9.events.service.mapping.UserMappingService;
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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder;
    private final EmailService emailService;
    private final RoleService roleService;
    private final ConfirmationService confirmationService;
    private final UserMappingService userMappingService;


    private final EventUsersRepository eventUsersRepository;

    @Autowired
    public UserServiceImpl(UserRepository repository, BCryptPasswordEncoder encoder, EmailService emailService, RoleService roleService, ConfirmationService confirmationService, UserMappingService userMappingService, EventUsersRepository eventUsersRepository) {
        this.repository = repository;
        this.encoder = encoder;
        this.emailService = emailService;
        this.roleService = roleService;
        this.confirmationService = confirmationService;
        this.userMappingService = userMappingService;
        this.eventUsersRepository = eventUsersRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException(String.format("User %s not found", username))
        );
    }


    @Override
    public UserDto register(User user) throws UserAlreadyExistsException {
        user.setId(null);
        user.setPassword(encoder.encode(user.getPassword()));
        Role userRole = roleService.getRoleUser();
        user.setRoles(Set.of(userRole));

        user.setActive(true);
        try {
            repository.save(user);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            //  emailService.sendConfirmationEmail(user);
            UserDto userDto = userMappingService.mapEntityToDto(user);
            return userDto;
        } catch (DataIntegrityViolationException exception) {
            throw new UserAlreadyExistsException("User with that name already exists");
        }
    }

    @Override
    @Transactional
    public void registrationConfirm(String code) {
        User user = confirmationService.getUserByConfirmationCode(code);
        user.setActive(true);

    }


    @Override
    public List<UserDto> getAllUsers() {
        return repository.findAll().stream().map(x -> userMappingService.mapEntityToDto(x)).toList();
    }

    @Override
    @Transactional
    public UserDto transferAdminRole(Long id) {
        User user = repository.findById(id).orElseThrow(() -> new UserNotFoundException("User is not found"));

        Role adminRole = roleService.getRoleAdmin();
        Role userRole = roleService.getRoleUser();
        Set<Role> updatedRoles = new HashSet<>();
        updatedRoles.add(adminRole);
        updatedRoles.add(userRole);
        user.setRoles(updatedRoles);
        user = repository.save(user);
        return userMappingService.mapEntityToDto(user);
    }

    @Override
    public UserDto blockUser(Long id) {
        User user = repository.findById(id).orElse(null);
        if (user != null) {
            user.setActive(false);
            repository.save(user);
            return userMappingService.mapEntityToDto(user);
        }
        throw new UserNotFoundException("User is not found");
    }

}
