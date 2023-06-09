const express = require('express');
const nodemailer = require('nodemailer');
const morgan = require('morgan');
const path = require ('path');
const hbs = require('express-handlebars');
const cors = require('cors');
const app = express();
const axios = require('axios');
const port = 3000 ;
const https = require('https');



//gui mail
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/send-email', (req, res) => {
  const username = req.body.username;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vancongkhai1810@gmail.com',
      pass: 'wyilmkrwfsaferxa'
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: 'vancongkhai1810@gmail.com',
    to: username,
    subject: 'Confirmation email',
    text: 'Xác nhận gmail này la thật. Bạn đã đăng ký thành công'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent');
    }
  });
});
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
app.get('/nhanvien', (req, res) => {
  res.render('nhanvien');
});
app.get('/taikhoan', (req, res) => {
  res.render('taikhoan');
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

