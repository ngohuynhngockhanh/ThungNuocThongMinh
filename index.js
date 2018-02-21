//demo
require('log-timestamp');
const socket_client = require('socket.io-client')
const socketServerURL = 'https://socket.mysmarthome.vn' //https nhé! bạn có thể để là http cũng được nhưng sẽ ít an toàn hơn https. HTTPS là an toàn tuyệt đối rồi! 
var socket = socket_client(socketServerURL); 

// Khi mở kết nối
socket.on('connect', function() {
	console.log("Connected to server")
})

// Khi server hỏi thông tin đăng nhập
socket.on("please_login", function() {
	//bạn phải gửi thông tin đăng nhập như thế này
	socket.emit('register_node', {
		"node_id":"r1O92dtSz",
		"uuid":"PsxUPldlbBNEuEUTi7Ci5yls77R2",
		"token":"301fd2e614a97927804613e73373ded2991661182107"
	})
})

//Nếu mã token được chấp nhận thì server sẽ gửi lệnh này
socket.on('accept', function(res) {
	var node_id = res.node_id
	var uuid = res.uuid
	console.log("Accept", node_id, "from", uuid)
})

//Có lỗi thì nó sẽ báo cho bạn ở đây, ví dụ như mã token bị sai nè... bạn sẽ code thêm vào!
socket.on('error', function(res) {
	var node_id = res.node_id
	var error = res.error
	console.error(node_id, error)
})

//Khi có data thì bạn sẽ lắng nghe được ở hàm này, if else xử lý thôi ^_^
socket.on('data', function(res) {
	var node_id = res.node_id
	var data = res_data
	console.log(node_id, data)
})

//Nếu không gửi thông tin đăng nhập hoặc toàn bộ thông tin đăng nhập sai thì nó ngắt két nối

// hoặc đơn giản là bị ngắt kết nối do mạng nhà chúng ta :D, đặt server ở heroku là yk bài!
socket.on('disconnect', function() {
	console.info("Socket client to server disconnected, maybe you forget to emit register_node")
	
	//kết nối lại thâu
	setInterval(function() {
		socket.connect()
	}, 5000)
})