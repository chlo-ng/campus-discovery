package com.team7.campusdiscoveryservice.service;

import com.team7.campusdiscoveryservice.entity.*;
import com.team7.campusdiscoveryservice.repository.EventRepository;
import com.team7.campusdiscoveryservice.repository.RSVPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;


@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RSVPRepository rsvpRepository;

    public List<Event> getEvents() {
        return this.eventRepository.findAll();
    }

    public Event getEvent(Long id) {
        return eventRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public Event createEvent(Event event,
                                      Long creatorID){
        event.setCreator(userService.getUser(creatorID));
        if (event.getImage() == null) {
            event.setImage(Event.defaultImageURL);
        }
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
        currentEvent.setInviteOnly(event.isInviteOnly());
        if (event.getImage() == null) {
            currentEvent.setImage(Event.defaultImageURL);
        } else {
            currentEvent.setImage(event.getImage());
        }
        currentEvent.setCreator(userService.getUser(creatorID));
        eventRepository.save(currentEvent);
        return currentEvent;
    }

    public Event updateEventTitle(Long id, String title) {
        Event currentEvent =
                eventRepository.findById(id).orElseThrow(RuntimeException::new);
        currentEvent.setTitle(title);
        eventRepository.save(currentEvent);

        return currentEvent;
    }

    public Event updateEventDescription(Long id, String description) {
        Event currentEvent =
                eventRepository.findById(id).orElseThrow(RuntimeException::new);
        currentEvent.setDescription(description);
        eventRepository.save(currentEvent);

        return currentEvent;
    }

    public Event updateEventDate(Long id, String date) {
        Event currentEvent =
                eventRepository.findById(id).orElseThrow(RuntimeException::new);
        String[] d = date.split("-");
        Date newDate = new Date(Integer.parseInt(d[0]) - 1900,
                Integer.parseInt(d[1]) - 1, Integer.parseInt(d[2]));
        currentEvent.setDate(newDate);
        eventRepository.save(currentEvent);

        return currentEvent;
    }

    public Event updateEventStartTime(Long id, String startTime) {
        Event currentEvent =
                eventRepository.findById(id).orElseThrow(RuntimeException::new);
        String[] st = startTime.split(":");
        Time newTime = new Time(Integer.parseInt(st[0]),
                Integer.parseInt(st[1]), Integer.parseInt(st[2]));
        currentEvent.setStartTime(newTime);
        eventRepository.save(currentEvent);

        return currentEvent;
    }

    public Event updateEventLocation(Long id, String location) {
        Event currentEvent =
                eventRepository.findById(id).orElseThrow(RuntimeException::new);
        currentEvent.setLocation(location);
        eventRepository.save(currentEvent);

        return currentEvent;
    }

    public Event updateEventImage(Long id, String image) {
        Event currentEvent =
                eventRepository.findById(id).orElseThrow(RuntimeException::new);
        currentEvent.setImage(image);
        eventRepository.save(currentEvent);

        return currentEvent;
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public void addInvite(Long eventId, Long userId) {
        User user = userService.getUser(userId);
        Event event = eventRepository.findById(eventId).orElseThrow(RuntimeException::new);

        event.getInvites().add(user);
        eventRepository.save(event);
    }

    public void deleteInvite(Long eventId, Long userId) {
        User user = userService.getUser(userId);
        Event event = eventRepository.findById(eventId).orElseThrow(RuntimeException::new);

        event.getInvites().remove(user);
        eventRepository.save(event);
    }


    //RSVP Specific Methods
    public RSVP addRSVP(Long eventId, Long userId, RsvpValue rsvpValue) {
        User user = userService.getUser(userId);
        Event event = eventRepository.findById(eventId).orElseThrow(RuntimeException::new);

        RSVP rsvp = new RSVP(new RSVPId(userId, eventId), user, event, rsvpValue);

        rsvpRepository.save(rsvp);

        return rsvp;
    }

    public RSVP updateRSVP(Long eventId, Long userId, RsvpValue rsvpValue) {
        User user = userService.getUser(userId);
        Event event = eventRepository.findById(eventId).orElseThrow(RuntimeException::new);

        RSVPId rsvpId = new RSVPId(userId, eventId);
        RSVP rsvp = rsvpRepository.findById(rsvpId).orElseThrow(RuntimeException::new);
        rsvp.setRsvp(rsvpValue);
        rsvpRepository.save(rsvp);

        return rsvp;
    }

    public void deleteRSVP(Long eventId, Long userId) {
        RSVPId rsvpId = new RSVPId(userId, eventId);
        rsvpRepository.deleteById(rsvpId);
    }

}
