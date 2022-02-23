import Database from 'better-sqlite3';
import { IPost, ISubreddit, IUser } from './types';

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
