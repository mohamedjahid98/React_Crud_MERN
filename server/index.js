const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express()
app.use(cors())
app.use(express.json())
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

mongoose.connect("mongodb://127.0.0.1:27017/crud", { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/employee', employeeRoutes);
app.use('/product', productRoutes);
app.use('/customer', customerRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(3001, ()=>{
    console.log('Server is Running..')
})

