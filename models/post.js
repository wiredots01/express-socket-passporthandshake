var mongoose = require('mongoose');


var postSchema = mongoose.Schema({
  title       : String,
  body        : String,
  ownerId     : Schema.Types.ObjectId,
  status      : Number,
  type        : Number,
  categoryId  : Schema.Types.ObjectId
});

module.exports = mongoose.model('Post', postSchema);