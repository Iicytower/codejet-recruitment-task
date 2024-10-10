import { IsNumber, Min, Max } from 'class-validator';

export class SensorDataDto {
  // temperature in degrees Celsius
  @IsNumber()
  @Min(-273) // absolute zero
  temperature: number;

  // humidity in percent
  @IsNumber()
  @Min(0)
  @Max(100)
  humidity: number;
}
