import express from 'express';
import cors from 'cors';
import { createUser, getUserBySpecificX } from './dbUtils';

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

   res.status(201).send(getUserBySpecificX('email', email));
});

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
