// import app from 'app';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
