import express from 'express';
import cors from 'cors';
import {
   createPost,
   createSubreddit,
   createUser,
   getAllPostsOrderedByUpvotes,
   getAllSubreddits,
   getCommentsBySpecificX,
   getPostBySpecificX,
   getSubredditBySpecificX,
   getUserBySpecificX,
} from './dbUtils';
import { IPost } from './types';

const PORT = 3009;
const app = express();
app.use(cors());
app.use(express.json());

app.post('/log-in', (req, res) => {
   const { email, password } = req.body;
   const user = getUserBySpecificX('email', email);

   if (!user)
      return res.send({ error: `A user with this email doesn't exist` });
   if (user && user.password !== password)
      return res.send({ error: `Wrong password` });
   delete user.password;
   res.send(user);
});

app.post('/sign-up', (req, res) => {
   const { email, username, password } = req.body;
   const existingUser = getUserBySpecificX('email', email);

   if (existingUser)
      return res
         .status(409)
         .send({ error: `A user with this email already exists.` });
   createUser(username, email, password);
   if (!email || !username || !password)
      return res
         .status(400)
         .send({ error: `Missing needed properties to create a user` });

   const userToSend = getUserBySpecificX('email', email);
   delete userToSend.password;
   res.status(201).send(userToSend);
});

app.get('/posts', (req, res) => {
   const posts: IPost[] = getAllPostsOrderedByUpvotes();

   for (const post of posts) {
      const postSubreddit = getSubredditBySpecificX(
         'id',
         post.subredditId!.toString()
      );
      const postUser = getUserBySpecificX('id', post.userId!.toString());
      const postComments = getCommentsBySpecificX(
         'postId',
         post.id!.toString()
      );
      post.subreddit = postSubreddit;
      post.user = postUser;
      post.comments = postComments;
      delete post.subredditId;
      delete post.userId;
   }

   res.send(posts);
});

app.get('/subreddits', (req, res) => {
   res.send(getAllSubreddits());
});

app.post('/create-subreddit', (req, res) => {
   const { name } = req.body;

   if (typeof name !== 'string' || name.length === 0)
      return res
         .status(400)
         .send({ error: 'Subreddit name not a string or too short!' });

   res.status(201).send(
      getSubredditBySpecificX(
         'id',
         createSubreddit(name).lastInsertRowid.toString()
      )
   );
});

app.get('/posts/:id', (req, res) => {
   const id = req.params.id;
   const post = getPostBySpecificX('id', id);
   if (!post)
      return res.status(404).send({ error: `Post with id ${id} not found! ` });

   post.user = getUserBySpecificX('id', post.userId!.toString());
   delete post.userId;
   delete post.user.password;
   delete post.user.email;

   res.send(post);
});

app.post('/create-post', (req, res) => {
   const { userId, content, subredditId } = req.body;
   const errors = [];

   if (typeof content !== 'string' || content.length === 0)
      errors.push('Content not a string or too short!');
   if (
      typeof userId !== 'number' ||
      !getUserBySpecificX('id', userId.toString())
   )
      errors.push(
         `User ID is not a number or a user with this id doesn't exist!`
      );
   if (
      typeof subredditId !== 'number' ||
      !getSubredditBySpecificX('id', subredditId.toString())
   )
      errors.push(
         `Subreddit ID is not a number or a subreddit with this id doesn't exist!`
      );

   if (errors.length !== 0) return res.status(400).send(errors);

   const postToSend = getPostBySpecificX(
      'id',
      createPost(content, userId, subredditId).lastInsertRowid.toString()
   );
   postToSend.user = getUserBySpecificX('id', postToSend.userId!.toString());
   delete postToSend.userId;
   delete postToSend.user.password;
   delete postToSend.user.email;

   res.status(201).send(postToSend);
});

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
