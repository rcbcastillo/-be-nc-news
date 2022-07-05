const app = require('../app.js');
const db = require('../../db/connection.js')
const request = require('supertest');
const seed = require('../../db/seeds/seed.js');

const {topicData, articleData, userData, commentData} = require('../../db/data/test-data/index.js');


beforeEach(() => seed({topicData, articleData, userData, commentData})); 
afterAll(() => db.end()); 

describe('GET:/api/topics --happy path', () => {
  test('200: responds with an an array of topic objects having slug and description properties', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body: {topics}}) => {
        const actual = topics;
        const topic = {
          description: 'The man, the Mitch, the legend',
          slug: 'mitch'
        }
        expect(actual[0]).toEqual(topic);
    })
  });
  
});

describe(`GET:/api/topics --sad path`, () => {
  test("404: invalid path", () => {
    return request(app)
      .get("/invalid-path")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("Invalid path");
      });
  });
});

describe('GET:/api/topics --happy path', () => {
  test('200: responds with an an array of article objects', () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({body: {articles}}) => {
        const actual = articles;
        const article = {
          article_id: 1,
          title: 'Living in the shadow of a great man',
          topic: 'mitch',
          author: 'butter_bridge',
          body: 'I find this existence challenging',
          created_at: '2020-07-09T20:11:00.000Z',
          votes: 100
        }
        expect(actual[0]).toEqual(article);
    })
  });  
});

describe('GET: /api/articles/:article_id', () => {
  test('200: with an object of an article containing seven properties', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({body: {article}}) => {
      expect(typeof article).toBe('object');
      expect(Object.keys(article)).toHaveLength(7);
    })

  });

  test('200: responds with an object containing article_id, title, topic, author, body, created_at and votes properties', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({body: {article}}) => {
      const numberOfKeys = Object.keys(article);
      expect(numberOfKeys.includes('article_id')).toBe(true);
      expect(numberOfKeys.includes('title')).toBe(true);
      expect(numberOfKeys.includes('topic')).toBe(true);
      expect(numberOfKeys.includes('author')).toBe(true);
      expect(numberOfKeys.includes('body')).toBe(true);
      expect(numberOfKeys.includes('created_at')).toBe(true);
      expect(numberOfKeys.includes('votes')).toBe(true);       
    })
  });

  test('200: responds with an object containing seven properties and given values', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({body: {article}}) => {     
      expect(article.article_id).toBe(1),
      expect(article.title).toBe('Living in the shadow of a great man'),
      expect(article.topic).toBe('mitch'),
      expect(article.author).toBe('butter_bridge'),
      expect(article.body).toBe('I find this existence challenging'),
      expect(article.created_at).toBe('2020-07-09T20:11:00.000Z'),
      expect(article.votes).toBe(100)
      })     
    })

  test('404: responds with an error message if the resource it is not found', () => {
    return request(app)
    .get('/api/articles/37')
    .expect(404)
    .then(({body:{message}}) => {
      expect(message).toBe('Resource not found')
    })
  });


});
