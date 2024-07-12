package group9.events.service;

import group9.events.domain.entity.Event;
import group9.events.service.interfaces.EventService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    @Override
    public List<Event> getActiveEvents() {
        return null;
    }

    @Override
    public Event getInformationAboutEvent(Long id) {
        return null;
    }

    @Override
    public List<Event> getArchiveEvents() {
        return null;
    }

    @Override
    public String seeComments(Long id) {
        return null;
    }

    @Override
    public String writeComments(String comments) {
        return null;
    }

    @Override
    public List<Event> getMyPointsInEvent() {
        return null;
    }

    @Override
    public Event createEvent(Event event) {
        return null;
    }

    @Override
    public void removeMyEvent(Long id) {
    }

    @Override
    public void changeEvent(Long id, Event newEvent) {

    }
}
