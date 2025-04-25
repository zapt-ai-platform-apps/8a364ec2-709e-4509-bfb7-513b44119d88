import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import handler from '../api/reviewApp';

// Mock the dependencies
vi.mock('postgres', () => {
  return {
    default: vi.fn(() => ({
      query: vi.fn(),
      end: vi.fn()
    }))
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

vi.mock('./shared/auth.js', () => {
  return {
    authenticateUser: vi.fn()
  };
});

vi.mock('./shared/sentry.js', () => {
  return {
    default: {
      captureException: vi.fn()
    }
  };
});

describe('reviewApp API handler', () => {
  let req, res, postgres, authenticateUser;
  
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
    
    postgres = require('postgres').default;
    postgres.mockReturnValue({
      query: vi.fn(),
      end: vi.fn()
    });
    
    authenticateUser = require('./shared/auth.js').authenticateUser;
    authenticateUser.mockResolvedValue({
      id: 'user-id',
      email: 'admin@zapt.ai'
    });
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  it('should handle large numeric IDs correctly', async () => {
    // Mock database responses
    const mockClient = postgres();
    mockClient.query.mockImplementation((query, params) => {
      if (query.includes('SELECT')) {
        return [{ id: '1066626094881734668', appName: 'Test App' }];
      } else if (query.includes('UPDATE')) {
        return [{ id: '1066626094881734668', status: 'approved' }];
      }
      return [];
    });
    
    await handler(req, res);
    
    // Check that the query was called with the string ID
    expect(mockClient.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT'),
      ['1066626094881734668']
    );
    
    expect(mockClient.query).toHaveBeenCalledWith(
      expect.stringContaining('UPDATE'),
      ['approved', expect.any(Date), '1066626094881734668']
    );
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'App approved successfully'
      })
    );
  });
  
  it('should return 404 when app is not found', async () => {
    // Mock database response with no app found
    const mockClient = postgres();
    mockClient.query.mockReturnValueOnce([]);
    
    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.stringContaining('App not found')
      })
    );
  });
});