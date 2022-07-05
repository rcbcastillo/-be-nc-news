const app = require('../app.js');
const db = require('../../db/connection.js')
const request = require('supertest');
const seed = require('../../db/seeds/seed.js');

const {topicData, articleData, userData, commentData} = require('../../db/data/test-data/index.js');
const articles = require('../../db/data/test-data/articles.js');

beforeEach(() => seed({topicData, articleData, userData, commentData})); 
afterAll(() => db.end()); 

describe(`GET:/api/topics --happy path`, () => {
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


});
