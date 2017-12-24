import test from 'tape'
import nock from 'nock'
import FetchService from '../lib'

const TEST_URL = 'http://test.api.com'

const testService = new FetchService({
  name: '',
  options: {},
  base: TEST_URL,
})

const query = {
  $sort: {
    createdAt: -1,
  },
}

// const scope = nock(TEST_URL)
nock(TEST_URL)
  .persist()
  .get('/')
  .reply(200, {
    username: 'pgte',
    email: 'pedro.teixeira@gmail.com',
  })
  .get('/user')
  .reply(200, {
    username: 'pgte23',
    email: 'pedro23.teixeira@gmail.com',
  })
  .get('/users')
  .query(query)
  .reply(200, {
    username: 'particle4dev',
    email: 'particle4dev@gmail.com',
  })
  .post('/', () => true)
  .reply(201, (uri, requestBody, cb) => {
    cb(null, requestBody)
  })
  .post('/users', () => true)
  .reply(201, (uri, requestBody, cb) => {
    cb(null, requestBody)
  })

test('find', async (t) => {
  t.plan(6)

  let res = await testService.find()
  t.equal(res.username, 'pgte')
  t.equal(res.email, 'pedro.teixeira@gmail.com')

  res = await testService.find('user')
  t.equal(res.username, 'pgte23')
  t.equal(res.email, 'pedro23.teixeira@gmail.com')

  res = await testService.find('users', {
    query,
  })
  t.equal(res.username, 'particle4dev')
  t.equal(res.email, 'particle4dev@gmail.com')
})

test('get', async (t) => {
  t.plan(4)

  let res = await testService.get('user')
  t.equal(res.username, 'pgte23')
  t.equal(res.email, 'pedro23.teixeira@gmail.com')

  res = await testService.get('users', {
    query,
  })
  t.equal(res.username, 'particle4dev')
  t.equal(res.email, 'particle4dev@gmail.com')
})

test('create', async (t) => {
  t.plan(4)

  let res = await testService.create('users', {
    username: 'particle4dev',
    email: 'particle4dev@gmail.com',
  })
  t.equal(res.username, 'particle4dev')
  t.equal(res.email, 'particle4dev@gmail.com')

  res = await testService.create('', {
    username: 'particle4dev',
    email: 'particle4dev@gmail.com',
  })
  t.equal(res.username, 'particle4dev')
  t.equal(res.email, 'particle4dev@gmail.com')
})
