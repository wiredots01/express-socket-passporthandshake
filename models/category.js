var mongoose =  require('mongoose');


var categorySchema =  mongoose.Schema({
  name: String,
  icon: String
});

module.exports = mongoose.model('Category', categorySchema);