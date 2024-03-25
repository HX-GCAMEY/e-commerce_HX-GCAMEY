import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.development.env' });

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  const masterUser = {
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
  };

  const testUser = {
    email: 'test1@example.com',
    name: 'Test User 1',
    password: 'Testing12*',
    address: '404 Oak Street',
    phone: 123455667,
    country: 'Mexico',
    city: 'Mexico City',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /products', async () => {
    const req = await request(app.getHttpServer()).get('/products');
    expect(req.status).toBe(200);
    expect((res) => {
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  it('GET /products/:id returns an error if the id is not an UUID', async () => {
    const req = await request(app.getHttpServer()).get('/products/1');

    expect(req.status).toBe(400);
  });

  it('GET /products/:id returns an error if the product does not exist returns status code 404', async () => {
    const req = await request(app.getHttpServer()).get(
      '/products/00000000-0000-0000-0000-000000000000',
    );

    expect(req.status).toBe(404);
  });

  it('POST /auth/signup Creates a user and returns status code 201 ', async () => {
    const signIn = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(masterUser);

    token = signIn.body.token;

    const req = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser);

    console.log(req.body);

    expect(req.status).toBe(201);

    await request(app.getHttpServer())
      .delete(`/users/${req.body.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it('POST /auth/signup returns an error if the email is already in use an status code 404', async () => {
    const signIn = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(masterUser);

    token = signIn.body.token;

    const req1 = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser);

    const req = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser);

    expect(req.status).toBe(400);
    expect(req.body.message).toBe('User already exists');

    await request(app.getHttpServer())
      .delete(`/users/${req.body.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app.getHttpServer())
      .delete(`/users/${req1.body.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it('POST /auth/signin returns an error if the email is not found and status code 404', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signin').send({
      email: 'someemail@mail.com',
      password: 'Password123*',
    });

    expect(req.status).toBe(404);
  });
});
