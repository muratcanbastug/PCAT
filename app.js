const express = require('express');
const ejs = require('ejs');
const path = require('path');
app = express();

const PORT = 3000;

app.set('view engine', 'ejs');

// use ve get middleware fonksiyonlarıdır.
app.use(express.static('public'));

const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
};

app.use(myLogger);

app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('index');
});

app.get('/about', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('about');
});

app.get('/add', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('add');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
