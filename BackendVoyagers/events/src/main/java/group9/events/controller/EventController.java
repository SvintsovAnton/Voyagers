package group9.events.controller;

import group9.events.domain.entity.Event;
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
@GetMapping("/event")
public Event getInformationAboutEvent(@RequestParam Long id) {
    return service.getInformationAboutEvent(id);
}

    @GetMapping("/archive")
    public List<Event> getArchiveEvents() {
        return service.getArchiveEvents();
    }

    @GetMapping("/{id}/comments")
    public String seeComments(@PathVariable Long id) {
        return service.seeComments(id);
    }
    @PostMapping("/{id}/comments")
    public String writeComments(@PathVariable Long id, @RequestBody String comments) {
        return service.writeComments(comments);
    }


    @GetMapping("/my") public List<Event> getMyPointsInEvent() {
        return service.getMyPointsInEvent();
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
}


