const dotenv = require('dotenv');
dotenv.config(); 

console.log('DEBUG: MONGO_URI is', process.env.MONGO_URI); 

const dbConnect = require('./Config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
