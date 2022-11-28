
INSERT INTO users (username, password, role) VALUES
  ('lucas', 'lucas123', 'TEACHER'),
  ('sophia', 'sophia123', 'STUDENT'),
  ('chloe', 'chloe123', 'STUDENT'),
  ('nanxi', 'nanxi123', 'STUDENT'),
  ('alyssa', 'alyssa123', 'ALUMNI');

INSERT INTO events (title, event_date, start_time, description, invite_only, location, capacity, image, creator_id) VALUES
   ('VSA Moonfest', '2022-10-13', '18:00:00', 'Free food, prizes, and performances', TRUE, 'Tech Green, North Avenue Northwest, Atlanta, GA', 10,
   'https://www.gatech.edu/sites/default/files/hg_media/5ed108a9-1570-4e46-b85f-b9e76ecd7ac6248135fd-1bb8-4417-a3dd-43f81bd4a2ce.jpg', 1),
   ('HackGT', '2022-10-21', '19:00:00', 'Gt''s annual 36-hour hackathon event', TRUE, 'Klaus Advanced Computing Building, Ferst Drive Northwest, Atlanta, GA', 12,
   'https://2022.hack.gt/img/main/logo/hackgt9logo.png', 2),
   ('Seoulstice Showcase', '2022-11-30', '18:30:00', 'Kpop dance performances by GT''s kpop dance team', FALSE, 'Klaus Advanced Computing Building, Ferst Drive Northwest, Atlanta, GA', 20,
   'https://se-images.campuslabs.com/clink/images/04d420cf-babf-414e-876e-1d397621a15128de7b0e-e3df-4172-aced-64db73b3f075.png?preset=med-sq', 3),
   ('CSA Kickball Tournament', '2022-10-29', '15:00:00', 'Come compete against other teams! Winner gets prizes',  FALSE, 'Couch Park (Burger Bowl Field), Atlanta, GA', 5,
   'https://d1fdloi71mui9q.cloudfront.net/NMgs240RlqYTL9g2qVPg_8sMLFUswP06DHFoS', 4),
   ('China Care Cure Your Cravings', '2022-11-11', '18:30:00', 'Support education and care of vulnerable Asian children. Presale: $6',  FALSE, 'Klaus Advanced Computing Building, Ferst Drive Northwest, Atlanta, GA', 35,
   'https://www.gatech.edu/sites/default/files/styles/hero_16_9_large_992x558_/public/hg_media/0c1080b5-a856-42d7-9863-a4b50195a30356f55c3b-97c8-4339-9869-cbe626928437.png?h=fc6e1666&itok=F9aNuqHR', 1),
   ('AASA Tour of Asia', '2022-11-04', '18:00:00', 'Free food, photo booths, portrait artists, and fun activities by cultural organizations',  FALSE, 'Tech Green, North Avenue Northwest, Atlanta, GA', 2,
   'https://diversityprograms.gatech.edu/sites/default/files/hg_media/Newsletter%20Header%20%281%29.jpg', 2),
   ('GTIA Night Market', '2022-11-03', '18:00:00', 'Come enjoy a night of music, food, art, and traditions featured by cultural organizations', FALSE, 'Tech Green, North Avenue Northwest, Atlanta, GA', 6,
   'https://www.gatech.edu/sites/default/files/hg_media/9e28d8e7-7da3-4842-bfec-9efbe550dd0f4e408401-7249-4f11-a566-c13396417b0f.png', 3),
   ('FSA GBM Dance Workshop', '2022-11-07', '18:00:00', 'Get groovy and dance with us at our next GBM', TRUE, 'Exhibition Hall, 4th Street Northwest, Atlanta, GA', 13,
   'https://se-images-blob.campuslabs.com/documents/5429/70a6c90a-bac0-43ba-d99a-08d95f47a41f/1500.png', 4),
   ('WACC Resume Review', '2022-10-27','18:30:00', 'Join Meta this week for resume review, swag, and free food', TRUE, 'College of Computing Room 102, Atlantic Dr NW, Atlanta, GA', 14,
   'https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/312809501_437750851813132_1382566330835633984_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=OqKwOQyJxosAX9ZhBja&_nc_ht=scontent-atl3-1.xx&oh=00_AfDESnt8ZK9KD_KMVZ_Opcq4yt8cYc_W5ygD82Wabegkjg&oe=636F230C', 1),
   ('SCPC Fall Concert', '2022-10-22', '19:00:00', '2022 Fall Concert featuring student openers and a nationally-recognized artist!', TRUE, 'Tech Green, North Avenue Northwest, Atlanta, GA', 6,
   'https://www.concertarchives.org/image_uploads/photo/image/505104/large_image.jpg', 2),
   ('KUSA Fall Mixer', '2022-10-21', '17:00:00', 'First fall mixer with music by Alex Heisey', FALSE, 'Georgia Tech Student Center, Ferst Drive Northwest, Atlanta, GA', 17,
   'https://se-images.campuslabs.com/clink/images/8bca73f1-5c66-4924-b3ae-15af044168cd15220d48-b195-491d-b852-bb6687bdb80c.JPG?preset=med-sq', 3);

INSERT INTO rsvp (user_id, event_id, rsvp) VALUES
    (1, 2, 'YES'),
    (2, 1, 'YES'),
    (3, 3, 'NO'),
    (1, 4, 'YES'),
    (4, 5, 'NO'),
    (5, 6, 'MAYBE'),
    (2, 7, 'NO'),
    (3, 8,'MAYBE'),
    (5, 9, 'MAYBE'),
    (4, 10, 'YES');

INSERT INTO event_invite (user_id, event_id) VALUES
    (1, 2),
    (3, 2),
    (2, 1),
    (3, 8),
    (5, 9),
    (4, 10);


