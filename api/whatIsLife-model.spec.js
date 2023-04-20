const supertest = require('supertest');
const server = './server.js'
const db = '../data/dbConfig.js'


beforeEach(async() => {
  await db.seed.run()
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

describe('mini intergration' ,() => {


  it('gets a list of friends', async () => {
    const res = await supertest(server).get('/friends')

    expect(res.statusCode).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.length).toBeGreaterThanOrEqual(4)
    expect(res.body[0].name).toBe('AJ')

  })

  it('gets a id', async () => {

    const res = await supertest(server).get('/friends/1')

    expect(res.statusCode).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.id).toBe(1)
    expect(res.body.name).toBe('AJ')

  })


  it('creates a shelby' ,  async () => {

    const res = await (await supertest(server).post('/friends')).setEncoding({name: 'lyub kovbel'})

    expect(res.statusCode).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe('lyub kovbel')

  })

  it('Deletes', async () => {

    const res = await supertest(server).get('/friends/4')

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('user no longer exists')

  })


})