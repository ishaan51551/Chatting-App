const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

//middleware
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => { //app. get → It is only for handling GET HTTP requests.
    res.sendFile(__dirname + '/index.html')

    //res.send('Hello World');
})

//socket


io.on('connection', (socket) => {
    console.log('connected...')

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg); //it will send to all the browsers (servers) the messages.
    })

})