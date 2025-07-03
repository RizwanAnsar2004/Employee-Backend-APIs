const dotenv = require('dotenv');
dotenv.config(); 

// console.log('DEBUG: MONGO_URI is', process.env.MONGO_URI); 


const app = require('./app');

const PORT = process.env.PORT || 5000;

// dbConnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
