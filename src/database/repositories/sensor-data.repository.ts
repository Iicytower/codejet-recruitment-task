import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorData } from '../schemas/sensor-data.schema';

@Injectable()
export class SensorDataRepository {
  constructor(
    @InjectModel('SensorData') private sensorDataModel: Model<SensorData>,
  ) {}

  async create(sensorData: Partial<SensorData>): Promise<SensorData> {
    const createdSensorData = new this.sensorDataModel(sensorData);
    return createdSensorData.save();
  }

  async findAll(): Promise<SensorData[]> {
    return this.sensorDataModel.find().exec();
  }

  async findOne(id: string): Promise<SensorData | null> {
    return this.sensorDataModel.findById(id).exec();
  }

  async update(
    id: string,
    sensorData: Partial<SensorData>,
  ): Promise<SensorData | null> {
    return this.sensorDataModel
      .findByIdAndUpdate(id, sensorData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<SensorData | null> {
    return this.sensorDataModel.findByIdAndDelete(id).exec();
  }
}
