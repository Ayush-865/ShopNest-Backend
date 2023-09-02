const express = require('express');
const cors = require('cors');

require('./models/config');
require('./models/User')
require('./models/Products')
require('./models/imageDetails')

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/image', require('./routes/images'));

app.listen(5000,()=>{
    console.log("Connected to http://localhost:5000");
})