package group9.events.service;

import group9.events.domain.dto.EventCommentsDto;
import group9.events.domain.entity.Event;
import group9.events.domain.entity.EventComments;
import group9.events.domain.entity.EventUsers;
import group9.events.domain.entity.User;
import group9.events.repository.EventCommentsRepository;
import group9.events.repository.EventRepository;
import group9.events.repository.EventUsersRepository;
import group9.events.repository.UserRepository;
import group9.events.service.interfaces.EventService;
import group9.events.service.mapping.EventCommentsMappingService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventCommentsRepository eventCommentsRepository;
    private final UserRepository userRepository;
    private final EventUsersRepository eventUsersRepository;

    private final EventCommentsMappingService eventCommentsMappingService;

    public EventServiceImpl(EventRepository eventRepository, EventCommentsRepository eventCommentsRepository, UserRepository userRepository, EventUsersRepository eventUsersRepository, EventCommentsMappingService eventCommentsMappingService) {
        this.eventRepository = eventRepository;
        this.eventCommentsRepository = eventCommentsRepository;
        this.userRepository = userRepository;
        this.eventUsersRepository = eventUsersRepository;
        this.eventCommentsMappingService = eventCommentsMappingService;
    }

    private User getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null){
            String userName= authentication.getName();
            User user = userRepository.findByEmail(userName).orElse(null);
            return user;
        }
        return null;
    }

    @Override
    public List<Event> getActiveEvents() {
        return eventRepository.findByStartDateTimeAfter(LocalDateTime.now());
    }

    @Override
    public Event getInformationAboutEvent(Long id) {
      return eventRepository.findById(id).orElse(null);
    }

    @Override
    public List<Event> getArchiveEvents() {
        return eventRepository.findByStartDateTimeBefore(LocalDateTime.now());
    }

    @Override
    public List<EventCommentsDto> seeComments(Long eventId) {
        return eventCommentsRepository.findByEventId(eventId).stream().
                map(eventCommentsMappingService::mapEntityToDto)
                .collect(Collectors.toList());
    }

    //TODO finalize exceptions
    @Override
    public EventCommentsDto writeComments(Long eventId, Long userId, String comments) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (event.getEndDateTime().isAfter(LocalDateTime.now())) {
            throw new IllegalArgumentException("Event has not ended yet");
        }

        EventComments eventComments = new EventComments();
        eventComments.setEvent(event);
        eventComments.setUser(user);
        eventComments.setComments(comments);
        eventComments.setDateTime(LocalDateTime.now());
        eventCommentsRepository.save(eventComments);
        return eventCommentsMappingService.mapEntityToDto(eventComments);


    }


//TODO implement later a search by the user who is currently registered
    @Override
    public List<Event> getMyPointsInEvent(Long userId) {
return null;
    }

    @Override
    public Event createEvent(Event event) {

        event.setId(null);
        eventRepository.save(event);
        EventUsers eventUsers = new EventUsers();
        eventUsers.setEvent(event);
        User user = getCurrentUser();
        eventUsers.setUser(user);
        eventUsers.setUser(getCurrentUser());
       eventUsersRepository.save(eventUsers);
       return event;
    }

    @Override
    public Event removeMyEvent(Long id) {
        Event event= getInformationAboutEvent(id);
          eventRepository.deleteById(id);
        return event;
    }

    @Override
    public Event changeEvent(Long id, Event newEvent) {
        Event altEvent = eventRepository.findById(id).orElse(null);
        if (altEvent!=null){
            altEvent.setTitle(newEvent.getTitle());
            altEvent.setAddressStart(newEvent.getAddressStart());
            altEvent.setStartDateTime(newEvent.getStartDateTime());
            altEvent.setAddressEnd(newEvent.getAddressEnd());
            altEvent.setEndDateTime(newEvent.getEndDateTime());
           return eventRepository.save(altEvent);
        }
return null;
    }

    @Override
    public void applyEvent(Long eventId, Long userId) {
        EventUsers eventUsers = new EventUsers();
        eventUsers.setEvent(eventRepository.getReferenceById(eventId));
        eventUsers.setUser(userRepository.getReferenceById(userId));
        if (eventUsers.getEvent() != null || eventUsers.getUser() != null) {
            eventUsersRepository.save(eventUsers);
        }
    }

    @Override
    public void cancelEventRequest(Long eventId, Long userId) {
        EventUsers eventUsers = eventUsersRepository.findByEvent_IdAndUser_Id(eventId, userId).orElse(null);
        if (eventUsers != null) {
            eventUsersRepository.delete(eventUsers);
        }
    }
}
