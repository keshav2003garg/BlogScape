const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectToMongo = require('./database/db')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');
dotenv.config({ path: ".env.local" });
connectToMongo();
cloudinary.config({ cloud_name: process.env.CLOUDINARY_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET })
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());



app.use('/api/', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));



app.use(errorMiddleware);



app.listen(process.env.port, () => {
  console.log(`http://localhost:${process.env.port}`);
})
