// DATABASE DISABLED FOR STATIC V1 DEPLOYMENT
// import mongoose from 'mongoose';

export async function connectDB() {
  console.warn("DATABASE CONNECTION ATTEMPTED BUT DISABLED (STATIC MODE)");
  return null;
}