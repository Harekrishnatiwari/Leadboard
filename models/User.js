const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Method to update rankings
userSchema.statics.updateRankings = async function() {
  const users = await this.find().sort({ totalPoints: -1 });
  
  for (let i = 0; i < users.length; i++) {
    users[i].rank = i + 1;
    await users[i].save();
  }
  
  return users;
};

module.exports = mongoose.model('User', userSchema);
