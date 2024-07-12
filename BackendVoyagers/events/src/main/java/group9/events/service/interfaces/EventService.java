package group9.events.service.interfaces;

import group9.events.domain.entity.Event;

import java.util.List;

public interface EventService {

    List<Event> getActiveEvents();

    Event getInformationAboutEvent(Long id);

    List<Event> getArchiveEvents();

String seeComments(Long id);
    String writeComments(String comments);

    List<Event> getMyPointsInEvent();

    Event createEvent(Event event);

    void removeMyEvent(Long id);

    void changeEvent(Long id, Event newEvent);

}
