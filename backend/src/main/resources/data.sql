
INSERT INTO users (username, password, role) VALUES
  ('lucas', 'lucas123', 'TEACHER'),
  ('sophia', 'sophia123', 'STUDENT'),
  ('chloe', 'chloe123', 'STUDENT'),
  ('nanxi', 'nanxi123', 'STUDENT'),
  ('alyssa', 'alyssa123', 'ALUMNI');

INSERT INTO events (title, event_date, start_time, description, invite_only, location, image, creator_id) VALUES
   ('VSA Moonfest', '2022-10-13', '18:00:00', 'Free food, prizes, and performances', TRUE, 'Tech Green',
   'https://www.gatech.edu/sites/default/files/hg_media/5ed108a9-1570-4e46-b85f-b9e76ecd7ac6248135fd-1bb8-4417-a3dd-43f81bd4a2ce.jpg', 1),
   ('HackGT', '2022-10-21', '19:00:00', 'Gt''s annual 36-hour hackathon event', TRUE, 'Klaus',
   'https://2022.hack.gt/img/main/logo/hackgt9logo.png', 2),
   ('Seoulstice Showcase', '2022-11-30', '18:30:00', 'Kpop dance performances by GT''s kpop dance team', FALSE, 'Klaus Atrium',
   'https://se-images.campuslabs.com/clink/images/04d420cf-babf-414e-876e-1d397621a15128de7b0e-e3df-4172-aced-64db73b3f075.png?preset=med-sq', 3),
   ('CSA Kickball Tournament', '2022-10-29', '15:00:00', 'Come compete against other teams! Winner gets prizes',  FALSE, 'Burger Bowl Field',
   'https://d1fdloi71mui9q.cloudfront.net/NMgs240RlqYTL9g2qVPg_8sMLFUswP06DHFoS', 4),
   ('China Care Cure Your Cravings', '2022-11-11', '18:30:00', 'Support education and care of vulnerable Asian children. Presale: $6',  FALSE, 'Klaus Atrium',
   'https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/312407275_542051751256969_4805148845801499825_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=63y-EK5idtYAX8mvqYf&_nc_ht=scontent-atl3-2.xx&oh=00_AfCChZNoj2rkkRnJJcCki309NOAIikWSm2wzME7dheI5ow&oe=636506EC', 1),
   ('AASA Tour of Asia', '2022-11-04', '18:00:00', 'Free food, photo booths, portrait artists, and fun activities by cultural organizations',  FALSE, 'Tech Green',
   'https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/273205220_356414153154840_7975113860451698751_n.jpg?stp=dst-jpg_p960x960&_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=toeKhbJU8XQAX9d6lPd&_nc_ht=scontent-atl3-2.xx&oh=00_AfDWUIwhipCroTPYd8_8KekB7LHqZZYg5GSyjl9uhpIeHg&oe=63657229', 2),
   ('GTIA Night Market', '2022-11-03', '18:00:00', 'Come enjoy a night of music, food, art, and traditions featured by cultural organizations', FALSE, 'Tech Green',
   'https://www.gatech.edu/sites/default/files/hg_media/9e28d8e7-7da3-4842-bfec-9efbe550dd0f4e408401-7249-4f11-a566-c13396417b0f.png', 3),
   ('FSA GBM Dance Workshop', '2022-11-07', '18:00:00', 'Get groovy and dance with us at our next GBM', TRUE, 'Home Park at Exhibition Hall',
   'https://se-images-blob.campuslabs.com/documents/5429/70a6c90a-bac0-43ba-d99a-08d95f47a41f/1500.png', 4),
   ('WACC Resume Review', '2022-10-27','18:30:00', 'Join Meta this week for resume review, swag, and free food', TRUE, 'CoC 102',
   'https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/312809501_437750851813132_1382566330835633984_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=jjU5tqqdprsAX_rP0zT&_nc_ht=scontent-atl3-1.xx&oh=00_AfCIXSTvkl81QLK0xn1PJnwf0NiEZtNx1N3u8Y7WD6fJgA&oe=63653FCC', 1),
   ('SCPC Fall Concert', '2022-10-22', '19:00:00', '2022 Fall Concert featuring student openers and a nationally-recognized artist!', TRUE, 'Tech Green',
   'https://www.concertarchives.org/image_uploads/photo/image/505104/large_image.jpg', 2),
   ('KUSA Fall Mixer', '2022-10-21', '17:00:00', 'First fall mixer with music by Alex Heisey', FALSE, 'Student Center',
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


