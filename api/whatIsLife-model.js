const db = require('../data/dbConfig')

function getAll(){
  return db('friends')
}

const getById = (id) => {
  return db('friends').where({id}).first()
}

const insert = async (friend) => {
  
  const [id] = await db('friends').insert(friend)

  return getById(id)
}

const update = (id, changes) => {
  return null
}

const remove = (id) => {
  return db('friends').where({id}).del()
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
}
