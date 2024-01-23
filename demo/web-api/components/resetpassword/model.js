const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    email: { type: String, required: true, unique: true, },
    otp: { type: String, required: true, },
});

module.exports = mongoose.model('Resetpassword', schema) || mongoose.models.Resetpassword;