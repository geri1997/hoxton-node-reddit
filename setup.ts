import Database from 'better-sqlite3';
import {
   comments,
   posts,
   subreddits,
   users,
   usersSubreddits,
} from './initDbData';

const db = new Database('./data.db', {
   verbose: console.log,
});

db.exec(`
DROP TABLE IF EXISTS postUserUpvotes ;
DROP TABLE IF EXISTS postUserDownvotes ;
DROP TABLE IF EXISTS userCommentUpvotes ;
DROP TABLE IF EXISTS userCommentDownvotes ;
DROP TABLE IF EXISTS comments ;
DROP TABLE IF EXISTS posts ;

DROP TABLE IF EXISTS usersSubreddits;
DROP TABLE IF EXISTS users ;
DROP TABLE IF EXISTS subreddits ;





CREATE TABLE IF NOT EXISTS "users" (
    "id" INTEGER PRIMARY KEY,
    "username" TEXT  NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "subreddits" (
    "id" INTEGER PRIMARY KEY,
    "name" TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
    "id" INTEGER PRIMARY KEY,
    "userId" INTEGER  NOT NULL,
    "content" TEXT NOT NULL,
    "upvotes" INTEGER DEFAULT "0" NOT NULL,
    "downvotes" INTEGER DEFAULT "0" NOT NULL, 
    "subredditId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id"),
    FOREIGN KEY ("subredditId") REFERENCES "subreddits" ("id")
  );
  
  CREATE TABLE IF NOT EXISTS "comments" (
    "id" INTEGER PRIMARY KEY,
    "postId" INTEGER  NOT NULL,
    "content" TEXT NOT NULL,
    "upvotes" INTEGER DEFAULT "0" NOT NULL,
    "downvotes" INTEGER DEFAULT "0" NOT NULL,
    "userId" INTEGER  NOT NULL,
    FOREIGN KEY ("postId") REFERENCES "posts" ("id"),
    FOREIGN KEY ("userId") REFERENCES "users" ("id")
  );
  
  

  CREATE TABLE IF NOT EXISTS "usersSubreddits" (
        "id" INTEGER PRIMARY KEY,
       "userId" INTEGER NOT NULL,
      "subredditId" INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (subredditId) REFERENCES subreddits(id)
     );

     CREATE TABLE IF NOT EXISTS "postUserUpvotes" (
        "id" INTEGER PRIMARY KEY,
       "userId" INTEGER NOT NULL,
      "postId" INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (postId) REFERENCES posts(id)
     );

     CREATE TABLE IF NOT EXISTS "postUserDownvotes" (
        "id" INTEGER PRIMARY KEY,
       "userId" INTEGER NOT NULL,
      "postId" INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (postId) REFERENCES posts(id)
     );

     CREATE TABLE IF NOT EXISTS "userCommentUpvotes" (
        "id" INTEGER PRIMARY KEY,
       "userId" INTEGER NOT NULL,
      "commentId" INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (commentId) REFERENCES comments(id)
     );

     CREATE TABLE IF NOT EXISTS "userCommentDownvotes" (
        "id" INTEGER PRIMARY KEY,
       "userId" INTEGER NOT NULL,
      "commentId" INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (commentId) REFERENCES comments(id)
     );
  
`);

for (const { id, name } of subreddits) {
   db.prepare(`INSERT INTO subreddits (id,name) VALUES (?,?)`).run(id, name);
}

for (const { id, username, email, password } of users) {
   db.prepare(
      `INSERT INTO users (id,username,email,password) VALUES (?,?,?,?)`
   ).run(id, username, email, password);
}

for (const { id, content, userId, upvotes, downvotes, subredditId } of posts) {
   db.prepare(
      `INSERT INTO posts (id,content,userId,upvotes,downvotes,subredditId) VALUES (?,?,?,?,?,?)`
   ).run(id, content, userId, upvotes, downvotes, subredditId);
}

for (const { id, content, userId, upvotes, downvotes, postId } of comments) {
   db.prepare(
      `INSERT INTO comments (id,content,userId,upvotes,downvotes,postId) VALUES (?,?,?,?,?,?)`
   ).run(id, content, userId, upvotes, downvotes, postId);
}

for (const { id, userId, subredditId } of usersSubreddits) {
   db.prepare(
      `INSERT INTO usersSubreddits (id,userId,subredditId) VALUES (?,?,?)`
   ).run(id, userId, subredditId);
}
