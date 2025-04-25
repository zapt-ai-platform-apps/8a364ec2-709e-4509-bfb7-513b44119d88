import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import handler from '../api/reviewApp';

// Mock the dependencies
vi.mock('postgres', () => {
  const mockSql = vi.fn();
  mockSql.end = vi.fn();
  
  const mockPostgres = vi.fn(() => mockSql);
  return {
    default: mockPostgres
  };
});

vi.mock('drizzle-orm/postgres-js', () => {
  return {
    drizzle: vi.fn()
  };
});

vi.mock('../drizzle/schema.js', () => {
  return {
    affiliatePrograms: {}
  };
});

vi.mock('../api/shared/auth.js', () => {
  return {
    authenticateUser: vi.fn()
  };
});

vi.mock('../api/shared/sentry.js', () => {
  return {
    default: {
      captureException: vi.fn()
    }
  };
});

vi.mock('../api/shared/validators.js', () => {
  return {
    createValidator: () => (data) => data
  };
});

describe('reviewApp API handler', () => {
  let req, res, mockSql, authenticateUser;
  
  beforeEach(() => {
    req = {
      method: 'POST',
      body: {
        appId: '1066626094881734668', // Large numeric ID
        status: 'approved'
      },
      headers: {}
    };
    
    res = {
      status: vi.fn(() => res),
      json: vi.fn(() => res)
    };
    
    // Setup postgres mock
    mockSql = vi.fn();
    mockSql.end = vi.fn();
    require('postgres').default.mockReturnValue(mockSql);
    
    // Setup authentication mock
    authenticateUser = require('../api/shared/auth.js').authenticateUser;
    authenticateUser.mockResolvedValue({
      id: 'user-id',
      email: 'admin@zapt.ai'
    });
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  it('should handle large numeric IDs correctly', async () => {
    // Mock SQL results
    mockSql.mockImplementation((strings, ...values) => {
      const query = strings.join('?');
      
      // Return different results based on the query
      if (query.includes('SELECT')) {
        return [{ id: '1066626094881734668', appName: 'Test App' }];
      } else if (query.includes('UPDATE')) {
        return [{ id: '1066626094881734668', status: 'approved' }];
      }
      return [];
    });
    
    await handler(req, res);
    
    // Verify SQL was called with expected queries
    expect(mockSql).toHaveBeenCalled();
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'App approved successfully'
      })
    );
  });
  
  it('should return 404 when app is not found', async () => {
    // Mock SQL results for app not found
    mockSql.mockImplementation((strings, ...values) => {
      const query = strings.join('?');
      
      if (query.includes('SELECT')) {
        return []; // Empty results - no app found
      }
      return [];
    });
    
    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.stringContaining('App not found')
      })
    );
  });
});