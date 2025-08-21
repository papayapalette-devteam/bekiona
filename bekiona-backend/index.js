const express=require('express')
const cors=require('cors');
//  const path = require('path');
const connect = require('./connectdb');
const bodyParser = require('body-parser');
require('dotenv').config();
// const nodemailer = require('nodemailer');

const app=express();



app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use('/images', express.static('images'));
// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use(cors())
// app.use(cors({ origin: 'https://ln-bird-project-6m7b.vercel.app/' }));
app.use(cors({
    origin: ['https://ln-bird-project-6m7b.vercel.app', 'https://www.bekiona.com','http://localhost:3000'], // Allow both domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
connect();
app.get('/',(req,res)=>
{
    res.send("welcome home")
})
app.use('/',require('./Routes/admin'));


app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
