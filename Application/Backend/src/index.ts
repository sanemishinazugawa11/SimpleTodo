import express from 'express';
import cors from 'cors';
import { userRouter } from './Routes/userRoute';
import todoRouter from './Routes/todoRoutes';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);


app.get('/', (req, res) => {
  res.send('Hello World');
});



app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

export { app };