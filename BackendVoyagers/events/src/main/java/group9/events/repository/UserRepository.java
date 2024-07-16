package group9.events.repository;

import group9.events.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    //TODO не уверин что правильно! в уроке мы использовали username
    Optional<User> findBylastName(String lastname);
    Optional<User> findBydateOfBirth(String dateOfBirth);
    Optional<User> findByEmail(String email);
}
