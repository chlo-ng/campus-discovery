package com.team7.campusdiscoveryservice.controller;

import com.team7.campusdiscoveryservice.entity.Event;
import com.team7.campusdiscoveryservice.entity.User;
import com.team7.campusdiscoveryservice.repository.EventRepository;
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
    private EventRepository eventRepository;

    @GetMapping("events")
    public List<Event> getEvents() {
        return this.eventRepository.findAll();
    }

    @GetMapping("events/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("events")
    public ResponseEntity createEvent(@RequestBody Event event) throws URISyntaxException {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.created(new URI("/events/" + savedEvent.getId())).body(savedEvent);
    }

    @PutMapping("events/{id}")
    public ResponseEntity updateEvent(@PathVariable Long id,
                                     @RequestBody Event event) {
        Event currentEvent =
                eventRepository.findById(id).orElseThrow(RuntimeException::new);
        currentEvent.setTitle(event.getTitle());
        currentEvent.setDate(event.getDate());
        currentEvent.setDescription(event.getDescription());
        currentEvent.setStartTime(event.getStartTime());
        currentEvent.setCreator(event.getCreator());
        eventRepository.save(currentEvent);

        return ResponseEntity.ok(currentEvent);
    }

    @DeleteMapping("events/{id}")
    public ResponseEntity deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
