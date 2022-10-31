
INSERT INTO users (username, password, role) VALUES
  ('user1', 'password123', 'TEACHER'),
  ('user2', 'password234', 'STUDENT'),
  ('user3', 'password345', 'ALUMNI');

INSERT INTO events (title, event_date, start_time, description,
location, image, creator_id)
VALUES
   ('VSA Moonfest', '2022-10-13', '06:00:00', 'Free food, prizes, and performances', 'Tech Green', '/moonfest.png', 1),
   ('HackGT', '2022-10-21', '07:00:00', 'Hackathon event', 'Klaus', '/hackgt.png', 2);

INSERT INTO users_rsvp (user_id, event_id) VALUES
    (1, 2),
    (2, 1),
    (3, 2),
    (1, 1);


