CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL,
  "created_at" timestamp
);

CREATE TABLE "todos" (
  "id" serial PRIMARY KEY,
  "user_id" int,
  "body" varchar(255),
  "created_at" timestamp
);

ALTER TABLE "todos" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
