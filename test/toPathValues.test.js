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
            title: 'value3'
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
    expect(result.length).to.equal(expected.length)
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).to.deep.equal(expected[i])
    }
  })
  it('should work with object that contains circular references', () => {
    const json = {
      json: {
        dealsById: {
          '\u001ekey': 'dealsById',
          '\u001eparent': null,
          '1f6527f3-c99d-4ff0-b31f-09cb793b966f': {
            '\u001ekey': '1f6527f3-c99d-4ff0-b31f-09cb793b966f',
            '\u001eparent': {
              '\u001ekey': 'dealsById',
              '\u001eparent': null,
              '1f6527f3-c99d-4ff0-b31f-09cb793b966f': ['Circular'],
              'c3202ba8-2896-4633-838f-aac2d08dbcae': {
                '\u001ekey': 'c3202ba8-2896-4633-838f-aac2d08dbcae',
                '\u001eparent': ['Circular'],
                title: 'third deal today'
              },
              'cce23b62-5b13-46ee-9d93-3a0b5df741db': {
                '\u001ekey': 'cce23b62-5b13-46ee-9d93-3a0b5df741db',
                '\u001eparent': ['Circular'],
                title: 'go to awesome stack, kill relay for good'
              }
            },
            title: 'Buy trip to Miami with 20% discount'
          },
          'c3202ba8-2896-4633-838f-aac2d08dbcae': {
            '\u001ekey': 'c3202ba8-2896-4633-838f-aac2d08dbcae',
            '\u001eparent': {
              '\u001ekey': 'dealsById',
              '\u001eparent': null,
              '1f6527f3-c99d-4ff0-b31f-09cb793b966f': {
                '\u001ekey': '1f6527f3-c99d-4ff0-b31f-09cb793b966f',
                '\u001eparent': ['Circular'],
                title: 'Buy trip to Miami with 20% discount'
              },
              'c3202ba8-2896-4633-838f-aac2d08dbcae': ['Circular'],
              'cce23b62-5b13-46ee-9d93-3a0b5df741db': {
                '\u001ekey': 'cce23b62-5b13-46ee-9d93-3a0b5df741db',
                '\u001eparent': ['Circular'],
                title: 'go to awesome stack, kill relay for good'
              }
            },
            title: 'third deal today'
          },
          'cce23b62-5b13-46ee-9d93-3a0b5df741db': {
            '\u001ekey': 'cce23b62-5b13-46ee-9d93-3a0b5df741db',
            '\u001eparent': {
              '\u001ekey': 'dealsById',
              '\u001eparent': null,
              '1f6527f3-c99d-4ff0-b31f-09cb793b966f': {
                '\u001ekey': '1f6527f3-c99d-4ff0-b31f-09cb793b966f',
                '\u001eparent': ['Circular'],
                title: 'Buy trip to Miami with 20% discount'
              },
              'c3202ba8-2896-4633-838f-aac2d08dbcae': {
                '\u001ekey': 'c3202ba8-2896-4633-838f-aac2d08dbcae',
                '\u001eparent': ['Circular'],
                title: 'third deal today'
              },
              'cce23b62-5b13-46ee-9d93-3a0b5df741db': ['Circular']
            },
            title: 'go to awesome stack, kill relay for good'
          }
        }
      }
    }
    const expected = [
      {
        path: ['dealsById', '1f6527f3-c99d-4ff0-b31f-09cb793b966f', 'title'],
        value: 'Buy trip to Miami with 20% discount'
      },
      {
        path: ['dealsById', 'c3202ba8-2896-4633-838f-aac2d08dbcae', 'title'],
        value: 'third deal today'
      },
      {
        path: ['dealsById', 'cce23b62-5b13-46ee-9d93-3a0b5df741db', 'title'],
        value: 'go to awesome stack, kill relay for good'
      }
    ]
    const result = toPathValues(json)
    expect(result.length).to.equal(expected.length)
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).to.deep.equal(expected[i])
    }
  })
  // TODO json should be ignored if tackled
})
