CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL,
  UNIQUE KEY `ix_auth_username` (`username`,`authority`),
  CONSTRAINT `fk_authorities_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `groups` (
  `id` bigint(20) NOT NULL,
  `group_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `group_authorities` (
  `group_id` bigint(20) NOT NULL,
  `authority` varchar(50) NOT NULL,
  KEY `fk_group_authorities_group` (`group_id`),
  CONSTRAINT `fk_group_authorities_group` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `group_members` (
  `id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `group_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_group_members_group` (`group_id`),
  CONSTRAINT `fk_group_members_group` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users (username, password, enabled) VALUES ('user', 'password', true);
INSERT INTO users (username, password, enabled) VALUES ('user2', 'password2', false);
INSERT INTO users (username, password, enabled) VALUES ('admin', 'password', true);
INSERT INTO users (username, password, enabled) VALUES ('43550594W', '12341234', true);

INSERT INTO groups (id, group_name) VALUES (1, 'Usuaris');
INSERT INTO groups (id, group_name) VALUES (2, 'Administradors');

INSERT INTO group_authorities (group_id, authority) VALUES (1, 'ROLE_USER');
INSERT INTO group_authorities (group_id, authority) VALUES (2, 'ROLE_ADMIN');

INSERT INTO group_members (id, username, group_id) VALUES (1, 'user', 1);
INSERT INTO group_members (id, username, group_id) VALUES (2, 'user2', 1);
INSERT INTO group_members (id, username, group_id) VALUES (3, 'admin', 1);
INSERT INTO group_members (id, username, group_id) VALUES (4, 'admin', 2);
INSERT INTO group_members (id, username, group_id) VALUES (5, '43550594W', 2);

INSERT INTO authorities (username, authority) values ('admin', 'ROLE_ADMIN');
INSERT INTO authorities (username, authority) values ('admin', 'ROLE_USER');
INSERT INTO authorities (username, authority) values ('user', 'ROLE_USER');
INSERT INTO authorities (username, authority) values ('43550594W', 'ROLE_ADMIN');

select * from users;