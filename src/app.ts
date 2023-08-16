import express from 'express';
import authRouter from './routes/api/auth';
import usersRouter from './routes/api/users';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home page...');
});

// ROUTES
app.use(authRouter);
app.use('/users', usersRouter);

// 404 ROUTE
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// ERROR ROUTER
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  console.log('error handled: ', status, message);
  res.status(status).json({ message });
});

export default app;
