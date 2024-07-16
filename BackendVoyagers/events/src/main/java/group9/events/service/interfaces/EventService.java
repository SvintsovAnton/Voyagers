package group9.events.service.interfaces;

import group9.events.domain.entity.Event;
import group9.events.domain.entity.EventComments;
import group9.events.domain.entity.User;


import java.util.List;

public interface EventService {

    List<Event> getActiveEvents();

    Event getInformationAboutEvent(Long id);

    List<Event> getArchiveEvents();

    List<EventComments> seeComments(Long eventId);
    EventComments writeComments(Long eventId,Long userId, String comments);

    List<Event> getMyPointsInEvent(Long userId);

    Event createEvent(Event event);

    Event removeMyEvent(Long id);

    Event changeEvent(Long id, Event newEvent);

    void applyEvent(Long event_id, Long user_id);

    void cancelEventRequest(Long event_id, Long user_id);


}
