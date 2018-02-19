//demo
require('log-timestamp');
const socket_client = require('socket.io-client')

const socketServerURL = 'http://socket.mysmarthome.vn' 

var socket = socket_client(socketServerURL); 

socket.on('connect', function() {
})

socket.on("please_login", function() {
	socket.emit('register_node', {
		"node_id":"r1O92dtSz",
		"uuid":"PsxUPldlbBNEuEUTi7Ci5yls77R2",
		"token":"301fd2e614a97927804613e73373ded2991661182107"
	})
})

socket.on('accept', function(node_id, uuid) {
	console.log("Accept", node_id, "from", uuid)
})

socket.on('error', function(node_id, error) {
	console.error(node_id, error)
})

socket.on('data', function(node_id, data) {
	console.log(node_id, data)
})

socket.on('disconnect', function() {
	console.info("Socket client to server disconnected, maybe you forget to emit register_node")
	setInterval(function() {
		socket.connect()
	}, 5000)
})