var net = require('net')
var config = require('config.json')



function Network (clientId, secret, callback) {
  this.clientId = clientId
  this.secret = secret
}

Network.prototype.startClientGame = function () {
  
}

Network.prototype.startHostGame = function (gameID, gamePort, callback) {
  var self = this
  var piped = false
  
  var gameSocket = net.connect({port: gamePort})
  var lobbySocket = net.connect({port: config.lobbyServerPort, host: config.lobbyServer})
  
  //Game socket events
  gameSocket.on('connect', () => {})
  gameSocket.on('data', (gameData) => {
    lobbySocket.write(gameData)
  })
  gameSocket.on('close', () => {})
  
  //Lobby socket events
  lobbySocket.on('connect', () => {
    lobbySocket.write(JSON.stringify({g: gameID, c: self.clientId, s: self.secret}))
    callback()
  })

  lobbySocket.on('data', (lobbyData) => {
    gameSocket.write(lobbyData)
  })

  lobbySocket.on('close', () => {})
}

function processLobbyData () {

}

function signOnToLobby () {

}

module.exports = Network