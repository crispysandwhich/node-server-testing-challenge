const express = require('express')
const WhatIsLife = require('./whatIsLife-model')

const server = express()


server.use(express.json())

server.get("/", (req, res) => {
  res.status(200).json({ life: "slow" });
});

// get request to get all friends
server.get('/friends' , (req,res) => {
  WhatIsLife.getAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// get request with a certain ID 
server.get('/friends/:id' , (req,res) => {

  WhatIsLife.getById(req.params.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })

})

// post request 
server.post('/friends', async (req,res) => {
  res.json( await WhatIsLife.insert(req.body) )
})

// delete request
server.delete('/friends/:id', async (req,res) => {
  
  WhatIsLife.remove(req.params.id)
    .then(() => {
      res.status(200).json(`user no longer exists`)
    })
    .catch(err => res.status(500).json(err))

}) 



module.exports = server