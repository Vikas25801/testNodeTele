// Importing necessary modules
const express = require('express');

const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const token = '6509996039:AAEpRtn2QdWcPYVZHHz2WxCCTZ7uK0jPY6g';

// Create a bot instance
const bot = new TelegramBot(token, { polling: false });

// Replace 'YOUR_GROUP_ID' with your actual group chat ID
const groupIdC = '-1002041458711';
const groupIdS = '-1002077076129';

// Creating an instance of Express application
const app = express();

// Define middleware to parse JSON bodies
app.use(express.json());

// Define a GET endpoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define a POST endpoint to handle incoming data
app.post('/dataC', (req, res) => {
    const data_ = req.body.data;

    bot.sendMessage(groupIdC, data_)
        .then(() => {
            //console.log('Message sent to group:', data_);
        })
        .catch((error) => {
            //console.error('Error sending message:', error);
        });

        res.send('Data received successfully!');

});

// Define a POST endpoint to handle incoming data
app.post('/dataS', (req, res) => {
    const data_ = req.body.data;

    bot.sendMessage(groupIdS, data_)
        .then(() => {
            //console.log('Message sent to group:', data_);
        })
        .catch((error) => {
            //console.error('Error sending message:', error);
        });

        res.send('Data received successfully!');

});

// Define a GET endpoint with a parameter
app.get('/user/:id', (req, res) => {
    const userId = req.params.id; // This will contain the value of the "id" parameter
    res.send(`User ID: ${userId}`);
});

// Define a default error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});











