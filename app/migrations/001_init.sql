CREATE DATABASE IF NOT EXISTS PoliceReport;

USE PoliceReport;

CREATE TABLE IF NOT EXISTS employee(
    e_id INTEGER NOT NULL AUTO_INCREMENT,
    fname       VARCHAR(20) NOT NULL,
    lname 	    VARCHAR(20) NOT NULL,
    dob         DATE NOT NULL,        /* dob = Date Of Birth */
    type 		VARCHAR(20) NOT NULL,
    username 	VARCHAR(255) NOT NULL UNIQUE,
    password 	VARCHAR(255) NOT NULL,
    phone 	    VARCHAR(15) NOT NULL, /* E.164 format https://en.wikipedia.org/wiki/E.164 */
    PRIMARY KEY (e_id)
);

CREATE TABLE IF NOT EXISTS policeman(
    p_id    INTEGER NOT NULL,
    status 	VARCHAR(20) NOT NULL,
    zipcode	VARCHAR(5)  NOT NULL,
    PRIMARY KEY (p_id),
    FOREIGN KEY	(p_id) REFERENCES employee(e_id)
);

CREATE TABLE IF NOT EXISTS emergency(
    emergency_id    INTEGER NOT NULL AUTO_INCREMENT,
    status          VARCHAR(20) NOT NULL,
    lead_responder  INTEGER,
    zipcode	        VARCHAR(5) NOT NULL,
    started_at      DATETIME NOT NULL,
    ended_at        DATETIME,
    PRIMARY KEY (emergency_id),
    FOREIGN KEY	(lead_responder) REFERENCES policeman(p_id)
);

CREATE TABLE IF NOT EXISTS emergency_responder(
    emergency_id    INTEGER NOT NULL,
    e_id            INTEGER NOT NULL,
    started         DATETIME NOT NULL,
    PRIMARY KEY (emergency_id, e_id),
    FOREIGN KEY	(emergency_id) REFERENCES emergency(emergency_id),
    FOREIGN KEY	(e_id) REFERENCES employee(e_id)
);

CREATE TABLE IF NOT EXISTS emergency_note(
    note_id INTEGER NOT NULL AUTO_INCREMENT,
    emergency_id INTEGER NOT NULL,
    note VARCHAR(255) NOT NULL,
    e_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (note_id),
    FOREIGN KEY	(emergency_id) REFERENCES emergency(emergency_id),
    FOREIGN KEY	(e_id) REFERENCES employee(e_id)
);

INSERT IGNORE employee VALUES
(1, 'Jack', 'Ma', '1990-09-01', 'ADMIN', 'jackma@gmail.com', '100', '911'),
(2, 'Hi', 'Yes', '1990-09-02', 'CALL_OPERATOR', 'hiyes@gmail.com', '101', '911911'),
(3, 'Apple', 'Jose', '1990-09-03', 'POLICE', 'applejose@gmail.com', '102', '911911911'),
(4, 'Ok', 'Hello', '1990-09-04', 'POLICE', 'okhello@gmail.com', '103', '4081235436');

INSERT IGNORE policeman(p_id, status, zipcode) VALUE
(3, 'FREE', '95123'),
(4, 'FREE', '95136');
