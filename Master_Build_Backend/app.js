require('dotenv').config();
const PORT = process.env.PORT || 5000;

const express = require('express');
const{connectDb} =require('./configs/connectDb');
const authRoutes=require('./routes/authRoutes');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Home Page');
});
app.use('/',authRoutes);

connectDb(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
})
