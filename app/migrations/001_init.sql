create database if not exists PoliceReport;
use PoliceReport;

CREATE TABLE if not exists employee(
						e_id 		INTEGER NOT NULL AUTO_INCREMENT,
						e_fname 	VARCHAR(20) NOT NULL,
						e_lname 	VARCHAR(20) NOT NULL,
						e_age 		INTEGER NOT NULL,
						e_type 		VARCHAR(20) NOT NULL,
						e_username 	VARCHAR(20) NOT NULL,
						e_password 	VARCHAR(20) NOT NULL,
						e_phone 	BIGINT NOT NULL,
						primary key (e_id)
					);

CREATE TABLE if not exists policeman(
						p_id 		INTEGER NOT NULL,
						p_status 	VARCHAR(20) NOT NULL,
						p_zipcode	INTEGER,
						primary key (p_id),
						foreign key	(p_id) references employee(e_id)
					);

CREATE TABLE if not exists emergency(
						emergency_id INTEGER NOT NULL AUTO_INCREMENT,
						emergency_status VARCHAR(20) NOT NULL,
						emergency_lead_responder INTEGER NOT NULL,
						emergency_zipcode INTEGER NOT NULL,
						emergency_started_at VARCHAR(20),
						emergency_ended_at VARCHAR(20),
						primary key (emergency_id)
					);

CREATE TABLE if not exists emergency_responder(
									emergency_id 	INTEGER NOT NULL,
									e_id 			INTEGER NOT NULL,
									started 		VARCHAR(20) NOT NULL
							);

CREATE TABLE if not exists emergency_note(
							note_id INTEGER NOT NULL,
							emergency_id INTEGER NOT NULL,
							node CHAR NOT NULL,
							e_id INTEGER NOT NULL,
							created_at VARCHAR(20) NOT NULL
						);



INSERT  employee VALUES
(1, 'Jack', 'Ma', 30, 'ADMIN', 'jackma@gmail.com', '100', 911),
(2, 'Hi', 'Yes', 31, 'CALL_OPERATOR', 'hiyes@gmail.com', '101', 911911),
(3, 'Apple', 'Jose', 32, 'POLICE', 'applejose@gmail.com', '102', 911911911),
(4, 'Ok', 'Hello', 33, 'POLICE', 'okhello@gmail.com', '103', 4081235436);

INSERT policeman(p_id, p_status) VALUE
(3, 'FREE'),
(4, 'FREE');


