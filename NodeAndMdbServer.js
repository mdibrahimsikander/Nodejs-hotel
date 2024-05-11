const express=require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/',(req,res)=>{
    res.send('Welcome to my Hotel... How can we help you ? ... We have a list of menus')
})

//Import the Routes Files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000');
})