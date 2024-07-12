package group9.events.service.interfaces;


import group9.events.domain.entity.User;

import java.util.List;

public interface UserService {

void register(User user);

String confirmRegistration(String confirmCode);

void login(User user);

List<User> getAllUsers();



}
