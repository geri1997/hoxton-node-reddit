export interface IUser {
   username: string;
   email?: string;
   password?: string;
   id?: number;
}

export interface IPost {
   id?: number;
   userId?: number;
   content: string;
   upvotes?: number;
   downvotes?: number;
   subredditId?: number;
   subreddit?:ISubreddit
   user?:IUser
   comments?:IComment[]
}

export interface ISubreddit {
   id?: number;
   name: string;
}

export interface IComment {
   id?: number;
   postId: number;
   content: string;
   upvotes?: number;
   downvotes?: number;
   userId: number;
}

export interface IUserSubreddit {
   id?: number
   userId: number
   subredditId: number
}


