const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conectado ao banco de dados!"))
  .catch(err => console.error("❌ Erro ao conectar:", err.message));
