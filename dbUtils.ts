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

export const upvotePost = (userId: number, postId: number) => {
   db.prepare(
      `INSERT INTO postUserUpvotes (userId,postId) VALUES (?,?);   `
   ).run(userId, postId);
   db.prepare(
      `UPDATE posts
      SET upvotes = upvotes + 1 WHERE id=?;`
   ).run(postId);
};
// export const downvotePost = (userId: number, postId: number) => {
//    db.prepare(`INSERT INTO postUserDownvotes (userId,postId) VALUES (?,?)`).run(
//       userId,
//       postId
//    );
//    db.prepare(
//       `UPDATE posts
//         SET upvotes = upvotes - 1 WHERE id=?;`
//    ).run(postId);
// };
// export const upvoteComment = (userId: number, commentId: number) =>
//    db
//       .prepare(
//          `INSERT INTO userCommentUpvotes (userId,commentId) VALUES (?,?);

//       `
//       )
//       .run(userId, commentId);
// export const downvoteComment = (userId: number, commentId: number) =>
//    db
//       .prepare(
//          `INSERT INTO userCommentDownvotes (userId,commentId) VALUES (?,?)`
//       )
//       .run(userId, commentId);

export const getPostUpvote = (userId: number, postId: number) =>
   db
      .prepare(`SELECT * FROM postUserUpvotes WHERE userId=? AND postId=?`)
      .get(userId, postId);

export const removeUpvote = (postId: number, userId: number) => {
   db.prepare(`UPDATE posts SET upvotes = upvotes - 1  WHERE id = ?;`).run(
      postId
   );
   db.prepare(`DELETE FROM postUserUpvotes WHERE postId=? and userId=?;`).run(
      postId,
      userId
   );
};
