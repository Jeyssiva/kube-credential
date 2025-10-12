import request from 'supertest';
import app from '../src/app';
import * as issuanceService from '../src/services/issuance.service';

describe('Issuance Controller', () => {
  const mockPayload = { title: 'Cert A', subject: 'alice@example.com' };

  beforeEach(() => {
    jest.spyOn(issuanceService, 'issue').mockResolvedValue({
      alreadyIssued: false,
      credential: {
        id: 'abc123',
        hash: 'hashval',
        issuedAt: new Date().toISOString(),
        workerId: 'issuance-worke'
      }
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should issue credential and return 201', async () => {
    const res = await request(app).post('/api/issue').send(mockPayload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('issuedBy');
    expect(res.body.credential).toHaveProperty('id');
  });

  it('should return 409 if already issued', async () => {
    (issuanceService.issue as jest.Mock).mockResolvedValue({
      alreadyIssued: true,
      credential: {
        id: 'abc123',
        hash: 'hashval',
        issuedAt: new Date().toISOString(),
        workerId: 'issuance-worke'
      }
    });
    const res = await request(app).post('/api/issue').send(mockPayload);
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('issuedBy');
  });
});
