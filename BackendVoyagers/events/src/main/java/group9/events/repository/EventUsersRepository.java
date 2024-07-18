package group9.events.repository;

import group9.events.domain.entity.EventUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventUsersRepository extends JpaRepository<EventUsers, Long> {
    Optional<EventUsers> findByEvent_IdAndUser_Id(Long eventId, Long userId);

    Optional<List<EventUsers>> findEventUsersByEvent_Id(Long eventId);

    Optional<List<EventUsers>> findEventUsersByUser_Id(Long userId);
}
