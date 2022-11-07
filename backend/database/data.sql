DROP TABLE IF EXISTS build;

CREATE TABLE build (
    id SERIAL PRIMARY KEY,
    name varchar(100)
);

INSERT INTO build (name) VALUES ('archer');
