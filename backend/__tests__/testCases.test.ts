import request from 'supertest';
import app from '../index'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Rate Limiting', () => {
  it('should allow the first 5 requests', async () => {
    const promises:any[] = [];
    for (let i = 0; i < 5; i++) {
      // Push promises to the array
      promises.push(
        request(app)
          .post('/fetch-metadata')
          .send({ urls: ['https://facebook.com', 'https://facebook.com', 'https://facebook.com'] })
          .then(response => {
            expect(response.status).toBe(200);
          })
      );
    }
  }, 2000);

  it('should block the 6th request due to rate limit', async () => {
    const res = await request(app)
      .post('/fetch-metadata')
      .send({ urls: ['https://facebook.com', 'https://facebook.com', 'https://facebook.com'] });
    expect(res.status).toBe(429); 
  });
});


describe('Testing Data Fetching', () => {

  it('Should fetch facebook, netflix.com and linkedin', async () => {
    await sleep(1500);
    const res = await request(app)
        .post('/fetch-metadata')
        .send({ urls: ['https://facebook.com', 'https://netflix.com', 'https://linkedin.com'] })
        expect(res.status).toBe(200)
        const obj = res.body
        expect(Array.isArray(obj)).toBe(true);
        obj.forEach((item:any) => {
          expect(item.isFailed).toBe(false);
        });
    }, 15000);

  it('Trying to fetch only 2 urls', async () => {
    await sleep(1500);
    const res = await request(app)
        .post('/fetch-metadata')
        .send({ urls: ['https://facebook.com', 'https://netflix.com'] })
        expect(res.status).toBe(400)
    }, 15000);

  it('Trying to fetch wrong urls', async () => {
    await sleep(1500);
    const res = await request(app)
        .post('/fetch-metadata')
        .send({ urls: ['paskdoasjdoj', 'ckznxicniqnewi', 'doqjwodjaodm12jidjas'] })
        expect(res.status).toBe(200)

        const obj = res.body
        expect(Array.isArray(obj)).toBe(true);
        obj.forEach((item:any) => {
          expect(item.isFailed).toBe(true);
        });
    }, 15000);
});