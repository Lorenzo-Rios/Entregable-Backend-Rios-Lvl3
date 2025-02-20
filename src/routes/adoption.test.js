import { expect } from 'chai';
import request from 'supertest';

const HOST = process.env.HOST || 'http://localhost:8081';

describe('GET /adoption', () => {
  it('should return a list of adoptions', async () => {
    const response = await request(HOST).get('/adoption');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('adoptions');
  });
});