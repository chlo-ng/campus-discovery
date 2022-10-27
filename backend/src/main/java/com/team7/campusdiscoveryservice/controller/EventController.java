package com.team7.campusdiscoveryservice.controller;

import com.team7.campusdiscoveryservice.entity.Event;
import com.team7.campusdiscoveryservice.service.EventService;
import com.team7.campusdiscoveryservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
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

    @PutMapping("events/{id}/title")
    public ResponseEntity updateEventTitle(@PathVariable Long id,
                                      @RequestBody String title) {

        try {
            title = parseAttribute(title);
            Event currentEvent = eventService.updateEventTitle(id, title);
            return ResponseEntity.ok(currentEvent);
        } catch (Exception e) {
            return new ResponseEntity<String>("Invalid title",
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("events/{id}/description")
    public ResponseEntity updateEventDescription(@PathVariable Long id,
                                           @RequestBody String description) {
        try {
            description = parseAttribute(description);
            Event currentEvent = eventService.updateEventDescription(id, description);
            return ResponseEntity.ok(currentEvent);
        } catch (Exception e) {
            return new ResponseEntity<String>("Invalid description",
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("events/{id}/date")
    public ResponseEntity updateEventDate(@PathVariable Long id,
                                                 @RequestBody String date) {
        try {
            date = parseAttribute(date);
            Event currentEvent = eventService.updateEventDate(id, date);
            return ResponseEntity.ok(currentEvent);
        } catch (Exception e) {
            return new ResponseEntity<String>("Invalid date",
                    HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("events/{id}/starttime")
    public ResponseEntity updateEventStartTime(@PathVariable Long id,
                                          @RequestBody String startTime) {
        try {
            startTime = parseAttribute(startTime);
            Event currentEvent = eventService.updateEventStartTime(id, startTime);
            return ResponseEntity.ok(currentEvent);
        } catch (Exception e) {
            return new ResponseEntity<String>("Invalid start time",
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("events/{id}/location")
    public ResponseEntity updateEventLocation(@PathVariable Long id,
                                               @RequestBody String location) {
        try {
            location = parseAttribute(location);
            Event currentEvent = eventService.updateEventLocation(id, location);
            return ResponseEntity.ok(currentEvent);
        } catch (Exception e) {
            return new ResponseEntity<String>("Invalid location",
                    HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("events/{id}/image")
    public ResponseEntity updateEventImage(@PathVariable Long id,
                                              @RequestBody String image) {
        try {
            image = parseAttribute(image);
            Event currentEvent = eventService.updateEventImage(id, image);
            return ResponseEntity.ok(currentEvent);
        } catch (Exception e) {
            return new ResponseEntity<String>("Invalid image",
                    HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("events/{id}")
    public ResponseEntity deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }


    public static String parseAttribute(String attribute) {
        return attribute.split(": ")[1].split("\"")[1].trim();
    }

}
