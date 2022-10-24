package com.team7.campusdiscoveryservice.controller;

import com.team7.campusdiscoveryservice.entity.Event;
import com.team7.campusdiscoveryservice.service.EventService;
import com.team7.campusdiscoveryservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


//Example for REST controller class
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/")
public class EventController {

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @GetMapping("events")
    public List<Event> getEvents() {
        return eventService.getEvents();
    }

    @GetMapping("events/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getEvent(id);
    }

    @PostMapping("events/{creatorID}")
    public ResponseEntity createEvent(@RequestBody Event event,
                                      @PathVariable Long creatorID) throws URISyntaxException {
        Event savedEvent = eventService.createEvent(event, creatorID);
        return ResponseEntity.created(new URI("/events/" + savedEvent.getId())).body(savedEvent);
    }

    @PutMapping("events/{id}/{creatorID}")
    public ResponseEntity updateEvent(@PathVariable Long id,
                                     @RequestBody Event event,
                                      @PathVariable Long creatorID) {
        Event currentEvent = eventService.updateEvent(id, event, creatorID);

        return ResponseEntity.ok(currentEvent);
    }

    @DeleteMapping("events/{id}")
    public ResponseEntity deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }

}
