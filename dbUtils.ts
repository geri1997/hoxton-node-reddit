import Database from 'better-sqlite3';
import { IComment, IPost, ISubreddit, IUser } from './types';

const db = new Database('./data.db', {
   verbose: console.log,
});

export const createPost = (
   content: string,
   userId: number,
   subredditId: number
) =>
   db
      .prepare(
         `INSERT INTO posts (userId,content,subredditId) VALUES (?, ?, ?)`
      )
      .run(userId, content, subredditId);

export const createUser = (username: string, email: string, password: string) =>
   db
      .prepare(`INSERT INTO users (username,email,password) VALUES (?, ?, ?)`)
      .run(username, email, password);

export const getUserBySpecificX = (column: string, value: string): IUser =>
   db
      .prepare(`SELECT * FROM users WHERE UPPER(${column})= UPPER(?);`)
      .get(value);

export const getAllPostsOrderedByUpvotes = (): IPost[] =>
   db
      .prepare(
         `SELECT *
      FROM posts
      ORDER BY upvotes DESC;`
      )
      .all();

export const getSubredditBySpecificX = (
   column: string,
   value: string
): ISubreddit =>
   db
      .prepare(`SELECT * FROM subreddits WHERE UPPER(${column})= UPPER(?);`)
      .get(value);

export const getCommentsBySpecificX = (
   column: string,
   value: string
): IComment[] =>
   db
      .prepare(`SELECT * FROM comments WHERE UPPER(${column})= UPPER(?);`)
      .all(value);

export const getAllSubreddits = (): ISubreddit[] =>
   db.prepare(`SELECT * FROM subreddits`).all();

export const createSubreddit = (name: string) =>
   db.prepare(`INSERT INTO subreddits (name) VALUES (?)`).run(name);

export const getPostBySpecificX = (column: string, value: string): IPost =>
   db
      .prepare(`SELECT * FROM posts WHERE UPPER(${column})= UPPER(?);`)
      .get(value);

export const getCommentBySpecificX = (column: string, value: string): IUser =>
   db
      .prepare(`SELECT * FROM comments WHERE UPPER(${column})= UPPER(?);`)
      .get(value);

export const upvotePost = (userId: number, postId: number) => {
   db.prepare(
      `INSERT INTO postUserUpvotes (userId,postId) VALUES (?,?);   `
   ).run(userId, postId);
   db.prepare(
      `UPDATE posts
      SET upvotes = upvotes + 1 WHERE id=?;`
   ).run(postId);
};
export const downvotePost = (userId: number, postId: number) => {
   db.prepare(`INSERT INTO postUserDownvotes (userId,postId) VALUES (?,?)`).run(
      userId,
      postId
   );
   db.prepare(
      `UPDATE posts
        SET downvotes = downvotes + 1 WHERE id=?;`
   ).run(postId);
};
export const upvoteComment = (userId: number, commentId: number) => {
   db.prepare(
      `INSERT INTO userCommentUpvotes (userId,commentId) VALUES (?,?);   `
   ).run(userId, commentId);
   db.prepare(
      `UPDATE comments
       SET upvotes = upvotes + 1 WHERE id=?;`
   ).run(commentId);
};


export const getPostUpvote = (userId: number, postId: number) =>
   db
      .prepare(`SELECT * FROM postUserUpvotes WHERE userId=? AND postId=?`)
      .get(userId, postId);

export const getPostDownvote = (userId: number, postId: number) =>
   db
      .prepare(`SELECT * FROM postUserDownvotes WHERE userId=? AND postId=?`)
      .get(userId, postId);

export const removePostUpvote = (postId: number, userId: number) => {
   db.prepare(`UPDATE posts SET upvotes = upvotes - 1  WHERE id = ?;`).run(
      postId
   );
   db.prepare(`DELETE FROM postUserUpvotes WHERE postId=? and userId=?;`).run(
      postId,
      userId
   );
};

export const removePostDownvote = (postId: number, userId: number) => {
   db.prepare(`UPDATE posts SET downvotes = downvotes - 1  WHERE id = ?;`).run(
      postId
   );
   db.prepare(`DELETE FROM postUserDownvotes WHERE postId=? and userId=?;`).run(
      postId,
      userId
   );
};

export const getCommentUpvote = (userId: number, commentId: number) =>
   db
      .prepare(
         `SELECT * FROM userCommentUpvotes WHERE userId=? AND commentId=?`
      )
      .get(userId, commentId);

export const removeCommentUpvote = (commentId: number, userId: number) => {
   db.prepare(`UPDATE comments SET upvotes = upvotes - 1  WHERE id = ?;`).run(
      commentId
   );
   db.prepare(
      `DELETE FROM userCommentUpvotes WHERE commentId=? and userId=?;`
   ).run(commentId, userId);
};

export const getCommentDownvote = (userId: number, commentId: number) =>
   db
      .prepare(
         `SELECT * FROM userCommentDownvotes WHERE userId=? AND commentId=?`
      )
      .get(userId, commentId);


      export const removeCommentDownvote = (commentId: number, userId: number) => {
        db.prepare(`UPDATE comments SET downvotes = downvotes - 1  WHERE id = ?;`).run(
           commentId
        );
        db.prepare(
           `DELETE FROM userCommentDownvotes WHERE commentId=? and userId=?;`
        ).run(commentId, userId);
     };


     export const downvoteComment = (userId: number, postId: number) => {
        db.prepare(`INSERT INTO userCommentDownvotes (userId,commentId) VALUES (?,?)`).run(
           userId,
           postId
        );
        db.prepare(
           `UPDATE comments
             SET downvotes = downvotes + 1 WHERE id=?;`
        ).run(postId);
     };