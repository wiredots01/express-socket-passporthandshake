var mongoose =  require('mongoose');

var commentSchema = mongoose.Schema({
  message: String,
  ownerId: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId
});


module.exports = mongoose.model('Comment', commentSchema);