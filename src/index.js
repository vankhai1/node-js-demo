const express = require('express');
const morgan = require('morgan');
const path = require ('path');
const hbs = require('express-handlebars');
const cors = require('cors');
const app = express();
const axios = require('axios');
const port = 3000 ;
const https = require('https');
const sanitizeHtml = require('sanitize-html');

const userInput = '<script>alert("XSS attack!")</script><p>Hello, world!</p>';
const sanitizedInput = sanitizeHtml(userInput);
console.log(sanitizedInput); // Output: <p>Hello, world!</p>

//css
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));
//loger
app.use(morgan('combined'));
//hand
app.engine('hbs', hbs.engine({
  extname:'hbs'
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.get('/home', (req, res) => {
  res.render('home');
});
app.get('/lhkh', (req, res) => {
  res.render('lhkh');
});
app.get('/lhkhr', (req, res) => {
  res.render('lhkhr');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/resigter', (req, res) => {
  res.render('resigter');
});
app.get('/chat', (req, res) => {
  res.render('chat');
});
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

axios.get('https://localhost:44363/api/ChucVu', { httpsAgent })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
//chat
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Tạo socket 
io.on('connection', function (socket) {
    console.log('Welcome to server chat');

    socket.on('send', function (data) {
        io.sockets.emit('send', data);
    });
});

//Khởi tạo 1 server listen tại 1 port
server.listen(3001);