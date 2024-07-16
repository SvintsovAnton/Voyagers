package group9.events.service;

import group9.events.domain.entity.User;
import group9.events.repository.UserRepository;
import group9.events.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder;

@Autowired
    public UserServiceImpl(UserRepository repository, BCryptPasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }
@Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException(
                        String.format("User %s not found", email))
        );
    }


    @Override
    public void register(User user) {
      //  user.setPassword(encoder.encode(user.getPassword()));
        user.setId(null);
        user.setPassword(encoder.encode(user.getPassword()));
        //TODO set roll
        //TODO set active
        repository.save(user);


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

    }

    @Override
    public void blockUser(Long id) {

    }

}
