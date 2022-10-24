package com.team7.campusdiscoveryservice.service;

import com.team7.campusdiscoveryservice.entity.Event;
import com.team7.campusdiscoveryservice.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserService userService;

    public List<Event> getEvents() {
        return this.eventRepository.findAll();
    }

    public Event getEvent(Long id) {
        return eventRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public Event createEvent(Event event,
                                      Long creatorID){
        event.setCreator(userService.getUser(creatorID));
        Event savedEvent = eventRepository.save(event);
        return savedEvent;
    }

    public Event updateEvent(Long id,
                                      Event event,
                                      Long creatorID) {
        Event currentEvent =
                eventRepository.findById(id).orElseThrow(RuntimeException::new);
        currentEvent.setTitle(event.getTitle());
        currentEvent.setDate(event.getDate());
        currentEvent.setDescription(event.getDescription());
        currentEvent.setStartTime(event.getStartTime());
        currentEvent.setLocation(event.getLocation());
        currentEvent.setCreator(userService.getUser(creatorID));
        eventRepository.save(currentEvent);
        return currentEvent;
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
