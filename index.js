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

socket.on('accept', function(res) {
	var node_id = res.node_id
	var uuid = res.uuid
	console.log("Accept", node_id, "from", uuid)
})

socket.on('error', function(res) {
	var node_id = res.node_id
	var error = res.error
	console.error(node_id, error)
})

socket.on('data', function(res) {
	var node_id = res.node_id
	var data = res_data
	console.log(node_id, data)
})

socket.on('disconnect', function() {
	console.info("Socket client to server disconnected, maybe you forget to emit register_node")
	setInterval(function() {
		socket.connect()
	}, 5000)
})