package group9.events.service.mapping;


import group9.events.domain.dto.UserDto;
import group9.events.domain.entity.User;

public class UserMapper {
    public static User toEntity(UserDto userDto) {
        User user = new User();
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        return user;
    }
}
