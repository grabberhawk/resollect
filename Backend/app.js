const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
  res.send('Hello World');
})
const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);

async function testDBConnection() {
  try {
    await prisma.$connect();
    console.log(' Connected to PostgreSQL (Aiven) successfully!');
  } catch (error) {
    console.error(' Database connection failed:', error);
   
  }
}

testDBConnection();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
