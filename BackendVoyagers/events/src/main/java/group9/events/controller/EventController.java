package group9.events.controller;

import group9.events.domain.entity.Event;
import group9.events.domain.entity.EventComments;
import group9.events.service.EventServiceImpl;
import group9.events.service.interfaces.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService service;


    public EventController(EventService service) {
        this.service = service;
    }


    @GetMapping("/active")
    public List<Event> getActiveEvents() {
        return service.getActiveEvents();
    }

//TODO проверить id
@GetMapping("/event/{id}")
public Event getInformationAboutEvent(@PathVariable Long id) {
    return service.getInformationAboutEvent(id);
}

    @GetMapping("/archive")
    public List<Event> getArchiveEvents() {
        return service.getArchiveEvents();
    }

    @GetMapping("/{id}/comments")
    public List<EventComments> seeComments(@PathVariable Long id) {
        return service.seeComments(id);
    }
    @PostMapping("/{eventId}/{userId}/comments")
    public EventComments writeComments(@PathVariable Long eventId,@PathVariable Long userId,  @RequestBody String comments) {
        return service.writeComments(eventId,userId,comments);
    }


    @GetMapping("/my/{id}") public List<Event> getMyPointsInEvent(@PathVariable Long userId) {
        return service.getMyPointsInEvent(userId);
    }


   @PostMapping()
   public Event createEvent(@RequestBody Event event) {
        return service.createEvent(event);
    }


    @DeleteMapping("/{id}")
    public void removeMyEvent(@PathVariable Long id) {
        service.removeMyEvent(id);
    }


    @PutMapping("/{id}")
    public void changeEvent(@PathVariable Long id, @RequestBody Event event) {
        service.changeEvent(id, event);
    }


    @PostMapping("{eventId}/{userId}/apply")
    public void applyEvent(@PathVariable Long eventId, @PathVariable Long userId){
        service.applyEvent(eventId, userId);
    }


    @DeleteMapping("/{eventId}/{userId}/cancel")
    public void cancelEventRequest(@PathVariable Long eventId, @PathVariable Long userId){
        service.cancelEventRequest(eventId, userId);
    }


}


