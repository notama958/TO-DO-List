const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');
const connectDb = require('../../config/db');
const { response } = require('express');

describe('GET /random', () => {
  let task;
  before(async () => {
    connectDb();
    task = await request(app).get('/api/v1/task/random');
  });
  it('should get a random object or 404 mesg', (done) => {
    try {
      //console.log(task);
      if (task.status === 200) {
        expect(task.body).to.be.a('array');
        expect(task.body).to.have.lengthOf(1);
        expect(task.body[0].list).to.be.a('object');
      } else if (task.status === 404) {
        expect(task.body.msg).to.equals('List is empty');
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
describe('GET /task/list/:id', () => {
  let task;
  const id = '5fd7b71643c3220f558b6953'; // dummy
  before(async () => {
    connectDb();
    task = await request(app).get(`/api/v1/task/list/${id}`);
  });
  it('should get a obj by id or 404 msg', (done) => {
    try {
      //console.log(task);
      if (task.status === 200) {
        expect(task.body).to.be.a('object');
        expect(task.body.list).to.be.a('object');
        expect(task.body.list.tasks).to.be.have.length.of.at.least(1);
      } else if (task.status === 404) {
        expect(task.body.msg).to.equals('List not found');
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
describe('POST /task/list/random', () => {
  let task;
  before(async () => {
    connectDb();
    task = await request(app).post(`/api/v1/task/list/random`);
  });
  afterEach(async () => {
    await request(app).delete(`/api/v1/task/list/${task.body}`);
  });
  it('should post a obj by id or 404 msg', (done) => {
    try {
      // console.log(task);
      expect(task.status).to.be.equals(200);
      expect(task.body).to.be.a('string');
      done();
    } catch (err) {
      done(err);
    }
  });
});
describe('DEL /task/list/:id', () => {
  let task;
  const id = '5fd7b71643c3220f558b6953'; // dummy
  before(async () => {
    connectDb();
    task = await request(app).delete(`/api/v1/task/list/${id}`);
  });

  it('should delete a obj by id or 404 msg', (done) => {
    try {
      // console.log(task);
      if (task.status === 200) {
        expect(task.status).to.be.equals(200);
        expect(task.body.msg).to.equals('List deleted');
      } else if (task.status === 404) {
        expect(task.body.msg).to.equals('List not found');
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
describe('POST /task/list', () => {
  let task;
  const list = {
    title: 'Testing',
    stars: 5,
    tasks: [
      {
        text: 'Dumm teeth',
        check: true,
      },
      {
        text: 'Dumm bed',
        check: false,
      },
      {
        text: 'Do homework',
        check: false,
      },
    ],
  };
  before(async () => {
    connectDb();
    task = await request(app).post(`/api/v1/task/list`).send(list);
  });
  afterEach(async () => {
    task = await request(app).delete(`/api/v1/task/list/${task.body}`);
  });

  it('should post a obj or 400 msg', (done) => {
    try {
      //console.log(task);
      if (task.status === 200) {
        expect(task.status).to.be.equals(200);
        expect(task.body).to.have.lengthOf(24); // _id of mongo
      } else if (task.status === 400) {
        expect(task.body.errors).to.be.have.length.of.at.least(1);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
