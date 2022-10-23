
INSERT INTO users (username, password, role) VALUES
  ('user1', 'password123', 'USER'),
  ('user2', 'password234', 'USER'),
  ('user3', 'password345', 'ADMIN');

INSERT INTO events (title, event_date, start_time, description,
location, creator_id)
VALUES
   ('VSA Moonfest', '2022-10-13', '06:00:00', 'Free food, prizes, and performances', 'Tech Green', 1),
   ('HackGT', '2022-10-21', '07:00:00', 'Hackathon event', 'Klaus', 2);

INSERT INTO users_rsvp (user_id, event_id) VALUES
    (1, 2),
    (2, 1),
    (3, 2),
    (1, 1);


