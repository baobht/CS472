import mongoose, { ConnectOptions, Mongoose } from "mongoose";

let cachedConnection: Mongoose | null = null;

const connectDB = async (): Promise<Mongoose> => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const uri = process.env.MONGO_URI;
    if (!uri)
      throw new Error("MONGO_URI is not defined in environment variables");

    const conn = await mongoose.connect(uri, {} as ConnectOptions);

    cachedConnection = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    console.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
