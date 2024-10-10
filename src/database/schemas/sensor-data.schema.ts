import { Schema, Document } from 'mongoose';

export interface SensorData extends Document {
  temperature: number;
  humidity: number;
}

export const SensorDataSchema = new Schema<SensorData>(
  {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
  },
  { timestamps: true },
);
