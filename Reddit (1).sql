CREATE TABLE "users" (
  "id" INTEGER PRIMARY KEY,
  "username" TEXT  NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL
);

CREATE TABLE "posts" (
  "id" INTEGER PRIMARY KEY,
  "userId" INTEGER  NOT NULL,
  "content" TEXT NOT NULL,
  "upvotes" INTEGER NOT NULL,
  "downvotes" INTEGER NOT NULL,
  "subredditId" INTEGER NOT NULL
);

CREATE TABLE "comments" (
  "id" INTEGER PRIMARY KEY,
  "postId" INTEGER  NOT NULL,
  "content" TEXT NOT NULL,
  "upvotes" INTEGER NOT NULL,
  "downvotes" INTEGER NOT NULL,
  "userId" INTEGER  NOT NULL
);

CREATE TABLE "subreddits" (
  "id" INTEGER PRIMARY KEY,
  "name" TEXT NOT NULL
);

ALTER TABLE "posts"  FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "comments"  FOREIGN KEY ("postId") REFERENCES "posts" ("id");

ALTER TABLE "comments"  FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "posts"  FOREIGN KEY ("subredditId") REFERENCES "subreddits" ("id");
