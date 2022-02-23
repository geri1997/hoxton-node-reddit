import express from 'express';
import cors from 'cors';
import { getUserBySpecificX } from './dbUtils';

const PORT = 3009;
const app = express();
app.use(cors());
app.use(express.json());

app.post('/log-in', (req, res) => {
const {email,password} = req.body
   const user = getUserBySpecificX('email', email);

   if (!user)
      return res.send({ error: `A user with this email doesn't exist` });
   if (user && user.password !== password)
      return res.send({ error: `Wrong password` });

      res.send(user)
});

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
