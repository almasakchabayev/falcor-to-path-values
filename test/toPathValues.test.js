import { expect } from 'chai'
import toPathValues from '../src/toPathValues'

describe('toPathValues', () => {
  it('works with an object with no siblings', () => {
    const json = {
      json: {
        dealsById: {
          '\u001ekey': 'dealsById',
          '\u001eparent': null,
          '1f6527f3-c99d-4ff0-b31f-09cb793b966f': {
            title: 'hello'
          },
        }
      }
    }
    const expected = [
      {
        path: ['dealsById', '1f6527f3-c99d-4ff0-b31f-09cb793b966f', 'title'],
        value: 'hello'
      }
    ]
    const result = toPathValues(json)
    expect(result[0]).to.deep.equal(expected[0])
    expect(result.length).to.equal(expected.length)
  })
  it('works with an object with siblings', () => {
    const json = {
      json: {
        dealsById: {
          '\u001ekey': 'dealsById',
          '\u001eparent': null,
          '1f6527f3-c99d-4ff0-b31f-09cb793b966f': {
            title: 'value1'
          },
          '1f6527f3-c99d-4ff0-b31f-09cb793b9sda': {
            title: 'value2'
          },
          '1f6527f3-c99d-4ff0-b31f-09cb793b9sad': {
            title: 'valu3'
          },
        },
        commentsById: {
          '\u001ekey': 'dealsById',
          '\u001eparent': null,
          '1f6527f3-c99d-4ff0-b31f-09cb793basdd': {
            text: 'comment1'
          },
          '1f6527f3-c99d-4ff0-b31f-09cb79asdffs': {
            text: 'comment2'
          },
          '1f6527f3-c99d-4ff0-b31f-asda793b9sad': {
            text: 'comment3'
          },
        }
      }
    }
    const expected = [
      {
        path: ['dealsById', '1f6527f3-c99d-4ff0-b31f-09cb793b966f', 'title'],
        value: 'value1'
      },
      {
        path: ['dealsById', '1f6527f3-c99d-4ff0-b31f-09cb793b9sda', 'title'],
        value: 'value2'
      },
      {
        path: ['dealsById', '1f6527f3-c99d-4ff0-b31f-09cb793b9sad', 'title'],
        value: 'value3'
      },
      {
        path: ['commentsById', '1f6527f3-c99d-4ff0-b31f-09cb793basdd', 'text'],
        value: 'comment1'
      },
      {
        path: ['commentsById', '1f6527f3-c99d-4ff0-b31f-09cb79asdffs', 'text'],
        value: 'comment2'
      },
      {
        path: ['commentsById', '1f6527f3-c99d-4ff0-b31f-asda793b9sad', 'text'],
        value: 'comment3'
      }
    ]
    const result = toPathValues(json)
    expect(result[0]).to.deep.equal(expected[0])
    expect(result.length).to.equal(expected.length)
  })
})
