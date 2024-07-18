package group9.events.service;

import group9.events.domain.dto.EventCommentsDto;
import group9.events.domain.entity.*;
import group9.events.repository.*;
import group9.events.service.interfaces.EventService;
import group9.events.service.mapping.EventCommentsMappingService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventCommentsRepository eventCommentsRepository;
    private final UserRepository userRepository;
    private final EventUsersRepository eventUsersRepository;

    private final EventCommentsMappingService eventCommentsMappingService;

    private final RoleForEventRepository roleForEventRepository;

    public EventServiceImpl(EventRepository eventRepository, EventCommentsRepository eventCommentsRepository, UserRepository userRepository, EventUsersRepository eventUsersRepository, EventCommentsMappingService eventCommentsMappingService, RoleForEventRepository roleForEventRepository) {
        this.eventRepository = eventRepository;
        this.eventCommentsRepository = eventCommentsRepository;
        this.userRepository = userRepository;
        this.eventUsersRepository = eventUsersRepository;
        this.eventCommentsMappingService = eventCommentsMappingService;
        this.roleForEventRepository = roleForEventRepository;
    }
//TODO Exception No users online
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String userName = authentication.getName();
            User user = userRepository.findByEmail(userName).orElse(null);
            return user;
        }
        return null;
    }
//TODO Exception There are no active events
    @Override
    public List<Event> getActiveEvents() {
        return eventRepository.findByStartDateTimeAfter(LocalDateTime.now());
    }

    //TODO The event does not exist
    @Override
    public Event getInformationAboutEvent(Long id) {
        return eventRepository.findById(id).orElse(null);
    }
    //TODO Exception There are no archive events
    @Override
    public List<Event> getArchiveEvents() {
        return eventRepository.findByStartDateTimeBefore(LocalDateTime.now());
    }

    //TODO no comments
    @Override
    public List<EventCommentsDto> seeComments(Long eventId) {
        return eventCommentsRepository.findByEventId(eventId).stream().
                map(eventCommentsMappingService::mapEntityToDto)
                .collect(Collectors.toList());
    }

    //TODO finalize exceptions
    @Override
    public EventCommentsDto writeComments(Long eventId, String comments) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        User user = getCurrentUser();

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
    public List<Event> getMyPointsInEvent() {
        User user = getCurrentUser();
        return eventUsersRepository.findEventUsersByUser_Id(user.getId()).orElse(null).stream().map(EventUsers::getEvent).toList();
    }

    //TODO Exception event could not be created
    @Override
    public Event createEvent(Event event) {

        event.setId(null);
        eventRepository.save(event);
        EventUsers eventUsers = new EventUsers();
        eventUsers.setEvent(event);
        User user = getCurrentUser();
        eventUsers.setUser(user);
        eventUsers.setUser(getCurrentUser());
        eventUsers.setRoleForEvent(roleForEventRepository.findByTitle("ROLE_OWNER").orElse(null));
        eventUsersRepository.save(eventUsers);
        return event;
    }

    //TODO  Exception when a user wants to delete an application that he is not the owner of
    @Override
    public Event removeMyEvent(Long id) {
        User user = getCurrentUser();
        List<EventUsers> listOfEventUsers = eventUsersRepository.findEventUsersByUser_Id(user.getId()).orElse(Collections.emptyList());
        EventUsers eventUsers = listOfEventUsers.stream()
                .filter(x->x.getEvent().
                        getId().equals(id)&&x.
                        getRoleForEvent().getTitle().equals("ROLE_OWNER"))
                .findFirst().orElse(null);

        if (eventUsers != null) {
            Event event = getInformationAboutEvent(id);
            eventUsersRepository.delete(eventUsers);




            eventRepository.deleteById(id);
            return event;
        }
        return null;
        //TODO place for Exception
    }

    //TODO An exception is when a user wants to change an application that he is not the owner of.
    @Override
    public Event changeEvent(Long id, Event newEvent) {
        User user = getCurrentUser();
        List<EventUsers> listOfEventUsers = eventUsersRepository.findEventUsersByUser_Id(user.getId()).orElse(Collections.emptyList());
EventUsers eventUsers = listOfEventUsers.stream()
        .filter(x->x.getEvent().
                getId().equals(id)&&x.
                getRoleForEvent().getTitle().equals("ROLE_OWNER"))
        .findFirst().orElse(null);

        if (eventUsers != null) {
            Event altEvent = eventRepository.findById(id).orElse(null);
            if (altEvent != null) {
                altEvent.setTitle(newEvent.getTitle());
                altEvent.setAddressStart(newEvent.getAddressStart());
                altEvent.setStartDateTime(newEvent.getStartDateTime());
                altEvent.setAddressEnd(newEvent.getAddressEnd());
                altEvent.setEndDateTime(newEvent.getEndDateTime());
                return eventRepository.save(altEvent);
            }
        }

        //TODO Place for Exception
        throw new RuntimeException("User is not authorized to update this event.");
    }

    //TODO Exception when the number of participants exceeds the maximum
    @Override
    public void applyEvent(Long eventId) {
        Event event = eventRepository.getReferenceById(eventId);
        if (eventUsersRepository.findEventUsersByEvent_Id(eventId).stream().count() < event.getMaximalNumberOfParticipants()) {
            User user = getCurrentUser();
            EventUsers eventUsers = new EventUsers();
            eventUsers.setEvent(event);
            eventUsers.setUser(user);
            eventUsers.setRoleForEvent(roleForEventRepository.findByTitle("ROLE_PARTICIPANT").orElse(null));
            if (eventUsers.getEvent() != null || eventUsers.getUser() != null) {
                eventUsersRepository.save(eventUsers);
            }
        }
        // TODO Place for Exception
    }

    //TODO Exception when a user wants to delete an application for which he has not registered
    @Override
    public void cancelEventRequest(Long eventId) {
        User user = getCurrentUser();
        EventUsers eventUsers = eventUsersRepository.findByEvent_IdAndUser_Id(eventId, user.getId()).orElse(null);
        if (eventUsers != null) {
            eventUsersRepository.delete(eventUsers);
        }
// TODO Place for Exception
    }
}