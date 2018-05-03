CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    display_name VARCHAR(255),
    auth_id TEXT,
    profile_pic TEXT,
    current_streak INTEGER,
    highest_streak INTEGER
)
CREATE TABLE WYR (
    question_id SERIAL PRIMARY KEY,
    option1 VARCHAR(500),
    option2 VARCHAR(500)
)
CREATE TABLE Stats (
    q_id INTEGER,
        FOREIGN KEY (q_id) REFERENCES wyr(question_id),
    option1_votes INTEGER,
    option2_votes INTEGER,
    total_votes INTEGER
)
