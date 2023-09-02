require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.DATABASE ;
mongoose.connect(uri);
