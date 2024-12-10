const express = require('express');
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesPerser = require('cookie-parser')
const { app, server } = require('./socket/index')

// const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookiesPerser())

const PORT = process.env.PORT || 8080

app.get('/', (request, response) => {
    response.json({
        message: "server running at " + PORT
    })
})

//api endpoints
app.use('/api', router)

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Server Running at Port Number : " + PORT);
    })
})



// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const connectDB = require('./config/connectDB');
// const router = require('./routes/index');
// const cookiesParser = require('cookie-parser');
// const { io, server } = require('./socket/index');  // Correct import

// const app = express();  // Define app here, as you are using it for Express server

// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

// app.use(express.json());
// app.use(cookiesParser());

// const PORT = process.env.PORT || 8080;

// app.get('/', (request, response) => {
//     response.json({
//         message: "Server running at " + PORT
//     });
// });

// // API endpoints
// app.use('/api', router);

// // Connect to the database and start the server
// connectDB().then(() => {
//     server.listen(PORT, () => {
//         console.log("Server Running at Port Number : " + PORT);
//     });
// });
