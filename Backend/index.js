const express = require('express')
const postRoute = require('./Routes/postsRoute.js')
const authRoute = require('./Routes/auth.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config({ path: "./Config/.env" })
const connectDB = require('./Config/database.js');
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);


app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})
