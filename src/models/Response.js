const mongoose =require('mongoose');

const responseSchema = new mongoose.Schema({

    prompt: String,
    response: String,
    createdAt :{type:Date , default : Date.now}
});

const Response = mongoose.model('Response',responseSchema);

module.exports = Response;