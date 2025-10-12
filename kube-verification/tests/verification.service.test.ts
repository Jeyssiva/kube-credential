import { verify } from '../src/services/verification.service';
import prisma from '../src/prisma/client';
import * as hashUtil from '../src/utils/hash';

process.env.ISSUANCE_URL = 'http://issuance:3001';

jest.mock('../src/prisma/client', () => ({
  verificationLog: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock computeHash
jest.spyOn(hashUtil, 'computeHash').mockImplementation(() => 'mocked-hash');

jest.mock('../src/utils/hash', () => ({
    computeHash: jest.fn().mockReturnValue('mocked-hash'),
  }));
  
const mockCredential = { title: 'Cert A', subject: 'John Doe' };
const workerId = 'test-worker';

describe('verification.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('✅ should return found=true from local DB', async () => {
    (prisma.verificationLog.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      hash: 'mocked-hash',
    });

    const result = await verify(mockCredential, workerId);
    expect(result).toEqual({
      found: true,
      source: 'local',
      record: { id: 1, hash: 'mocked-hash' },
    });
  });

//   it('✅ should call issuance service and return found=true from issuance', async () => {
//     (prisma.verificationLog.findFirst as jest.Mock).mockResolvedValue(null);
//     (prisma.verificationLog.create as jest.Mock).mockResolvedValue({});
  
//     global.fetch = jest.fn().mockResolvedValue({
//       ok: true,
//       json: async () => ({ found: true, data: { hash: 'mocked-hash', subject: 'John Doe' } }),
//     }) as any;
  
//     const result = await verify(mockCredential, workerId);
  
//     expect(global.fetch).toHaveBeenCalledTimes(1);
  
//     const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
//     expect(calledUrl).toContain('/api/issued/mocked-hash');
  
//     expect(result.found).toBe(true);
//     expect(result.source).toBe('issuance');
//   });  

  it('❌ should return found=false when not found locally or remotely', async () => {
    (prisma.verificationLog.findFirst as jest.Mock).mockResolvedValue(null);

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ found: false }),
    }) as any;

    const result = await verify(mockCredential, workerId);
    expect(result.found).toBe(false);
  });
});
