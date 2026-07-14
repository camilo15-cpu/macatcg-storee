import mongoose from 'mongoose';
// Esto se conecta a MongoDB Atlas (lo que seria la nube)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión: ${error.message}`);
    process.exit(1); // Detiene la app si no se puede conectar
  }
};

export default connectDB;
