const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  address: { type: String, required: true }, 
  postcode: { type: String, required: true },
  bedrooms: Number,
  bathrooms: Number,
  askingPrice: Number,
  floorArea: Number,
  dateAvailable: Date,
  image: { type: String, required: true }
});

module.exports = mongoose.model('Donut', propertySchema);


// 9 mkdir controllers && touch controllers/propertys.js
