import { Test, TestingModule } from '@nestjs/testing';
import { SensorData } from '../../database/schemas/sensor-data.schema';
import { SensorDataService } from './sensor-data.service';
import { SensorDataRepository } from '../../database';

describe('SensorDataService', () => {
  let service: SensorDataService;
  let repository: SensorDataRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorDataService,
        {
          provide: SensorDataRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SensorDataService>(SensorDataService);
    repository = module.get<SensorDataRepository>(SensorDataRepository);
  });

  describe('storeSensorData', () => {
    it('should store the sensor data using the repository', async () => {
      const mockSensorData = { temperature: 25, humidity: 50 };
      jest.spyOn(repository, 'create').mockResolvedValue({} as SensorData);

      await service.storeSensorData(mockSensorData);
      expect(repository.create).toHaveBeenCalledWith(mockSensorData);
    });
  });
});
