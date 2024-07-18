package group9.events.controller;

import group9.events.domain.entity.User;
import group9.events.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public void register(@RequestBody User user) {
        service.register(user);
    }

    @PostMapping("/login")
    public void login(@RequestBody User user) {
        service.login(user);
    }

    @GetMapping()
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }

    @PutMapping("/role/{user_id}")
    public void transferAdminRole(@PathVariable Long user_id){
        service.transferAdminRole(user_id);
    }

    @PutMapping("/block/{user_id}")
    public void blockUser(@PathVariable Long user_id){
        service.blockUser(user_id);
    }

}
