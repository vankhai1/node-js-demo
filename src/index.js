const express = require('express');
const morgan = require('morgan');
const path = require ('path');
const hbs = require('express-handlebars')
const app = express();
const port = 3000 ;

//css
app.use(express.static(path.join(__dirname, 'public')));
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});