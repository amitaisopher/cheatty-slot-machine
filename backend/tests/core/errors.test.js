import { CustomError } from '../../core/errors.js';

describe('CustomError', () => {
  it('should create an error with a message and status code', () => {
    const error = new CustomError('Test error', 400);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe('CustomError');
  });
});