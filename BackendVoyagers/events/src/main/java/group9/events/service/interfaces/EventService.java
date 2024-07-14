package group9.events.service.interfaces;

import group9.events.domain.entity.Event;
import group9.events.domain.entity.User;


import java.util.List;

public interface EventService {

    List<Event> getActiveEvents();

    Event getInformationAboutEvent(Long id);

    List<Event> getArchiveEvents();

    List<String> seeComments(Long eventId);
    String writeComments(Long eventId,Long userId, String comments);

    List<Event> getMyPointsInEvent(Long userId);

    Event createEvent(Event event);

    void removeMyEvent(Long id);

    void changeEvent(Long id, Event newEvent);

    void applyEvent(Long event_id, Long user_id);

    void cancelEventRequest(Long event_id, Long user_id);


}
