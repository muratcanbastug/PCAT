const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect ile varsa var olan bir database e bağlanır yoksa da oluşturur.
mongoose.connect('mongodb://localhost/pcat-test-db');

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

// .model parametre olarak verilen şablonu kullanarak bir collection oluşturur.
const Photo = mongoose.model('Photo', PhotoSchema);

// İlgili collection'a veri oluşturur.
/* Photo.create({
  title: 'Photo 2',
  description: 'Photo 2 description',
}); */

// Read data
/* Photo.find((err, data) => {
  console.log(data);
}); */

// Update Data
/* Photo.findByIdAndUpdate(
  '62ebc24878f2dd55d2050bf8',
  {
    title: 'Photo 1 Updated',
    description: 'Photo 1 description updated',
  },
  { new: true }, // new true data olarak döndürülen değerin güncellenmiş data olmasını sağlar.
  (err, data) => {
    console.log(data);
  }
); */

// Delete Data
// Photo.findByIdAndDelete('62ebc8317529e8c8ae7e52ca', (err, data) => {});
