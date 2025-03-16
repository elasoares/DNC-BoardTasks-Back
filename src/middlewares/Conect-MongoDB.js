const mongoose = require('mongoose');
const tratarErros = require('../functions/TratarErrors');

async function connectMongoDB(req = null, res = null, next = null){
  try{
    await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Conectado ao banco de dados!');
    try{ next(); } catch { };
    return mongoose;
  }catch(error){
    console.error(error);
    tratarErros(res, "Error: Error ao conectar ao banco de dados. ")
    return error;
  }
}

module.exports = connectMongoDB;
