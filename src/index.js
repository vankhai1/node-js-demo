const express = require('express');
const morgan = require('morgan');
const path = require ('path');
const hbs = require('express-handlebars');
const cors = require('cors');
const app = express();
const axios = require('axios');
const port = 3000 ;
const https = require('https');


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