import dotenv from 'dotenv';
import connectDB from './database/db.js';
import app from './app.js';

dotenv.config();

// connect to DB
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️  server is running at port : ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log('MongoDB connection failed !!! ', err);
  });
