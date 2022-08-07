const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const Photo = require('./models/Photo');
const ejs = require('ejs');
const fs = require('fs');
const methodOverride = require('method-override');
app = express();

mongoose.connect('mongodb://localhost/pcat-test-db');

const PORT = 3000;

app.set('view engine', 'ejs');

// use ve get middleware fonksiyonlarıdır.
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated'); // sondan sıralaması adına başına "-" konulur
  res.render('index', {
    photos,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });

  res.render('edit', {
    photo,
  });
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const photo = await Photo.create({
    ...req.body,
  });

  let uploadedImage = req.files.image.name.split('.');
  let uploadedImageName = uploadedImage[0] + photo._id + '.' + uploadedImage[1];
  let path = __dirname + '/public/uploads/' + uploadedImageName;

  req.files.image.mv(path, async () => {
    photo.image = '/uploads/' + uploadedImageName;
    await photo.save();
    res.redirect('/photos/' + photo._id);
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  await photo.save();
  res.redirect('/photos/' + photo._id);
});

app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
