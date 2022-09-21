const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
      agent.get('/').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => {
      agent.post('/sumArray').send({ array: [1, 2, 3], num: 3 })
        .expect(200)
    });
    it('responds with and object with message `test`', () =>
      agent.post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it('responds with False if add the same number twice to find the result', () =>
      agent.post('/sumArray')
        .send({ array: [2, 5, 7, 10], num: 10 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
    it('responds with False if the result is 1', () =>
      agent.post('/sumArray')
        .send({ array: [2, 5, 7, 10], num: 1 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
  });

  describe('POST /numString', () => {
    it('responds with 200', () => agent.post('/numString').send({ string: 'pikika' }).expect(200));
    it('responds with 400 if the string is a number', () => agent.post('/numString').send({ string: 5 }).expect(400));
    it('responds with 400 if the string is empty', () => agent.post('/numString').send({ string: '' }).expect(400));
    it('responds with the number of characters that the string that we pass', () =>
      agent.post('/numString')
        .send({ string: 'pikika' })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /pluck', () => {

    const array = [
      { nombre: 'facu', edad: 20, estudio: 'develover' },
      { nombre: 'juan', edad: 30, estudio: 'data' },
      { nombre: 'esteban', edad: 40, estudio: 'dentista' }
    ];

    it('responds with 200', () => agent.post('/pluck').send({ array: array, prop: 'edad' }).expect(200));
    it('responds with 400 if the array is not a array', () => agent.post('/pluck').send({ array: 1, prop: 'edad' }).expect(400));
    it('responds with 400 if the string of property is empty', () => agent.post('/pluck').send({ array: array, prop: '' }).expect(400));
    it('responds an array with only the values ​of that property', () =>
      agent.post('/pluck')
        .send({ array: array, prop: 'edad' })
        .then((res) => {
          expect(res.body.result).toEqual([20, 30, 40]);
        })
    );
  });

});

