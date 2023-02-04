import mongoose from 'mongoose'

export const ClientSchema = new mongoose.Schema({
  id: String,
  userId: Number,
  updatedAt: Date,
})
