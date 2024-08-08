import { Test, TestingModule } from '@nestjs/testing';
import { Socket } from 'socket.io';
import { SensorDataGateway } from './sensor-data.gateway';
import { SensorDataService } from '../../application';

describe('SensorDataGateway', () => {
  let gateway: SensorDataGateway;
  let service: SensorDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorDataGateway,
        {
          provide: SensorDataService,
          useValue: {
            storeSensorData: jest.fn(),
          },
        },
      ],
    }).compile();

    gateway = module.get<SensorDataGateway>(SensorDataGateway);
    service = module.get<SensorDataService>(SensorDataService);
  });

  describe('handleConnection', () => {
    it('should add the client to the set of connected clients', () => {
      const mockClient = { id: 'test-client-id' } as Socket;
      gateway.handleConnection(mockClient);
      expect(gateway['clients'].has(mockClient)).toBe(true);
    });
  });

  describe('handleDisconnect', () => {
    it('should remove the client from the set of connected clients', () => {
      const mockClient = { id: 'test-client-id' } as Socket;
      gateway.handleConnection(mockClient);
      gateway.handleDisconnect(mockClient);
      expect(gateway['clients'].has(mockClient)).toBe(false);
    });
  });

  describe('handleSensorData', () => {
    it('should store the sensor data and return a response', async () => {
      const mockSensorData = { temperature: 25, humidity: 50 };
      const mockClient = { id: 'test-client-id' } as Socket;

      jest.spyOn(service, 'storeSensorData').mockResolvedValue();

      const response = await gateway.handleSensorData(mockSensorData, mockClient);
      expect(service.storeSensorData).toHaveBeenCalledWith(mockSensorData);
      expect(response).toEqual({ event: 'sensorDataResponse', data: 'Data received successfully' });
    });
  });
});
