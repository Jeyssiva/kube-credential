import * as issuanceService from '../src/services/issuance.service';
import prisma from '../src/prisma/client';

jest.mock('../src/prisma/client', () => ({
  credential: {
    findUnique: jest.fn(),
    create: jest.fn()
  }
} as any));

describe('Issuance service', () => {
  afterEach(() => jest.resetAllMocks());

  it('should create new credential when not existing', async () => {
    (prisma.credential.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.credential.create as jest.Mock).mockResolvedValue({
      id: 'newid',
      hash: 'hash123',
      issuedAt: new Date(),
      workerId: 'issuance-worke'
    });

    const res = await issuanceService.issue({ title: 'T', subject: 'S' }, 'issuance-worke');
    expect(res.alreadyIssued).toBe(false);
    expect(res.credential.id).toBe('newid');
  });

  it('should return alreadyIssued true when existing', async () => {
    (prisma.credential.findUnique as jest.Mock).mockResolvedValue({
      id: 'exist',
      hash: 'hash123',
      issuedAt: new Date(),
      workerId: 'worker-2'
    });
    const res = await issuanceService.issue({ title: 'T', subject: 'S' }, 'issuance-worke');
    expect(res.alreadyIssued).toBe(true);
    expect(res.credential.id).toBe('exist');
  });
});