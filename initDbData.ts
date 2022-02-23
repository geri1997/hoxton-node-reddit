import { IComment, IPost, ISubreddit, IUser, IUserSubreddit } from './types';

export const users: IUser[] = [
   {
      id: 1,
      username: 'geri1997',
      email: 'geri@gmail.com',
      password: 'geri123',
   },
   {
      id: 2,
      username: 'nicoMar',
      email: 'nico@gmail.com',
      password: 'nico123',
   },
   {
      id: 3,
      username: 'edPut',
      email: 'ed@gmail.com',
      password: 'edi123',
   },
   {
      id: 4,
      username: 'bobS',
      email: 'bob@gmail.com',
      password: 'bob123',
   },
   {
      id: 5,
      username: 'agathaQ',
      email: 'agatha@gmail.com',
      password: 'agatha123',
   },
   {
      id: 6,
      username: 'jamesA',
      email: 'james@gmail.com',
      password: 'james123',
   },
];

export const posts: IPost[] = [
   {
      id: 1,
      userId: 3,
      content: 'This is a post with random text content',
      upvotes: 4,
      downvotes: 1,
      subredditId: 2,
   },
   {
      id: 2,
      userId: 3,
      content:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dicta?',
      subredditId: 1,
      upvotes: 86,
      downvotes: 32,
   },
   {
      id: 3,
      userId: 1,
      content:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, id vero sequi eum dignissimos aliquid?',
      upvotes: 2,
      downvotes: 91,
      subredditId: 4,
   },
   {
      id: 4,
      userId: 3,
      content:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, animi consequuntur. Adipisci?',
      upvotes: 11,
      downvotes: 1,
      subredditId: 2,
   },
   {
      id: 5,
      userId: 4,
      content:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, animi consequuntur. Adipisci?',
      upvotes: 15,
      downvotes: 2,
      subredditId: 3,
   },
   {
      id: 6,
      userId: 5,
      content:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, animi consequuntur. Adipisci?',

      downvotes: 10,
      upvotes: 41,
      subredditId: 4,
   },
];

export const subreddits: ISubreddit[] = [
   {
      id: 1,
      name: 'javascript',
   },
   {
      id: 2,
      name: 'typescript',
   },
   {
      id: 3,
      name: 'html',
   },
   {
      id: 4,
      name: 'node',
   },
];

export const comments: IComment[] = [
   {
      id: 1,
      postId: 2,
      content: 'test comment',
      upvotes: 1,
      downvotes: 10,
      userId: 4,
   },
   {
      id: 2,
      postId: 1,
      content: 'test content',
      upvotes: 10,
      downvotes: 2,
      userId: 1,
   },
   {
      id: 3,
      postId: 4,
      content: 'test content',
      upvotes: 15,
      downvotes: 2,
      userId: 2,
   },
   {
      id: 4,
      postId: 3,
      content: 'test content',
      upvotes: 41,
      downvotes: 3,
      userId: 4,
   },
   {
      id: 5,
      postId: 6,
      content: 'test content',
      upvotes: 19,
      downvotes: 21,
      userId: 3,
   },
   {
      id: 6,
      postId: 5,
      content: 'test content',
      upvotes: 23,
      downvotes: 5,
      userId: 5,
   },
   {
      id: 7,
      postId: 1,
      content: 'test content',
      upvotes: 32,
      downvotes: 5,
      userId: 6,
   },
   {
      id: 8,
      postId: 3,
      content: 'test content',
      upvotes: 9,
      downvotes: 10,
      userId: 1,
   },
   {
      id: 9,
      postId: 5,
      content: 'test content',
      upvotes: 26,
      downvotes: 16,
      userId: 2,
   },
   {
      id: 10,
      postId: 4,
      content: 'test content',
      upvotes: 30,
      downvotes: 18,
      userId: 4,
   },
];

export const usersSubreddits: IUserSubreddit[] = [
   { id: 1, userId: 1, subredditId: 2 },
   { id: 2, userId: 1, subredditId: 4 },
   { id: 3, userId: 2, subredditId: 1 },
   { id: 4, userId: 2, subredditId: 3 },
   { id: 5, userId: 2, subredditId: 4 },
   { id: 6, userId: 3, subredditId: 1 },
   { id: 7, userId: 4, subredditId: 3 },
   { id: 8, userId: 5, subredditId: 4 },
   { id: 9, userId: 6, subredditId: 1 },
];
