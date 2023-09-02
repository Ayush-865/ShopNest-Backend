const express = require('express');
const cors = require('cors');

require('./models/config');
require('./models/User')
require('./models/Products')
require('./models/imageDetails')

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const PORT = process.env.PORT || 5000

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/image', require('./routes/images'));

app.listen(PORT,()=>{
    console.log("Connected to http://localhost:5000");
})