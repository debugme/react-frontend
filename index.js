const express = require('express')

const server = express()

server.use(express.static('public'))

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log('server listening on port ' + port)
})
