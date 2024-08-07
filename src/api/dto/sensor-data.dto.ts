import { IsNumber, Min, Max } from 'class-validator';

export class SensorDataDto {
  @IsNumber()
  @Min(-50)
  @Max(50)
  temperature: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  humidity: number;
}
