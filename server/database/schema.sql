CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(150) NOT NULL,
  username VARCHAR(85) NOT NULL,
  password VARCHAR(85) NOT NULL,
  firstname VARCHAR(150) NOT NULL,
  lastname VARCHAR(150) NOT NULL,
  born_at DATE NOT NULL,
  address VARCHAR(150) NOT NULL,
  city VARCHAR(150) NOT NULL,
  zip_code CHAR(5) NOT NULL,
  phone CHAR(10) NOT NULL,
  picture VARCHAR(255)
);

CREATE TABLE sport (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(85) NOT NULL
);

CREATE TABLE activity (
  id INT PRIMARY KEY AUTO_INCREMENT,
  description TEXT,
  address  VARCHAR(150) NOT NULL,
  city VARCHAR(150) NOT NULL,
  zip_code CHAR(5) NOT NULL,
  playing_at DATE NOT NULL,
  playing_time TIME NOT NULL,
  playing_duration INT NOT NULL,
  nb_places INT NOT NULL,
  auto_validation BOOLEAN NOT NULL,
  price DECIMAL (5,2) DEFAULT 0,
  visibility BOOLEAN NOT NULL,
  level ENUM('begginer', 'amateur', 'advance' ,'All') DEFAULT 'All',
  disabled BOOLEAN DEFAULT 0,
  locker BOOLEAN,
  shower BOOLEAN,
  air_conditioning BOOLEAN,
  toilet BOOLEAN,
  user_id INT NOT NULL,
  sport_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
  ON DELETE CASCADE,
  FOREIGN KEY (sport_id) REFERENCES sport(id)
  ON DELETE CASCADE
);

CREATE TABLE demand (
  status ENUM('pending', 'accepted', 'refused') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  activity_id INT NOT NULL,
  user_id INT NOT NULL, 
  PRIMARY KEY (user_id, activity_id),
  FOREIGN KEY (user_id) REFERENCES user(id)
  ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activity(id)
);

CREATE TABLE participation ( 
  status ENUM('inviting', 'accepted', 'refused') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL, 
  activity_id INT NOT NULL,
  PRIMARY KEY (user_id, activity_id),
  FOREIGN KEY (user_id) REFERENCES user(id)
  ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activity(id)
);


INSERT INTO sport(name)
VALUES
  ("Football"),
  ("Rugby"),
  ("Basketball"),
  ("Handball"),
  ("Volleyball"),
  ("Running"),
  ("Natation"),
  ("Cyclisme"),
  ("VTT"),
  ("Tennis"),
  ("Tennis-de-table"),
  ("Badminton"),
  ("Squash"),
  ("Padel"),
  ("Bowling"),
  ("Fléchettes"),
  ("Pétanque"),
  ("Karting"),
  ("Canoë"),
  ("Surf"),
  ("Ski"),
  ("Snowboard"),
  ("Patinage"),
  ("Escalade"),
  ("Randonnée"),
  ("Skateboard")
