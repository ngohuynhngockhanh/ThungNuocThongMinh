//demo
require('log-timestamp');
const request = require('request'); //thư viện gửi REST API

const socket_client = require('socket.io-client')
const socketServerURL = 'https://socket.mysmarthome.vn' //https nhé! bạn có thể để là http cũng được nhưng sẽ ít an toàn hơn https. HTTPS là an toàn tuyệt đối rồi! 
var socket = socket_client(socketServerURL); 

//đây là mã sensor json
const sensorJson = {
	"node_id":"BJg3q5Yrz",
	"uuid":"tocn0lDP70YQij1kHOhjmo6KYdw1",
	"token":"f31a00157698d5088dfc7f8832ec8dca504014434807"
}
	

//có cũng được, không có cũng không sao!
const lightJson = {
	"node_id":"r1O92dtSz",
	"uuid":"PsxUPldlbBNEuEUTi7Ci5yls77R2",
	"token":"301fd2e614a97927804613e73373ded2991661182107"
}


// Khi mở kết nối
socket.on('connect', function() {
	console.log("Connected to server")
})



// Khi server hỏi thông tin đăng nhập
socket.on("please_login", function() {
	//bạn phải gửi thông tin đăng nhập như thế này
	
	//Đăng ký cảm biến
	socket.emit('register_node', sensorJson)
	
	//Đăng ký cái đèn
	socket.emit('register_node', lightJson)
	
})

//Nếu mã token được chấp nhận thì server sẽ gửi lệnh này
socket.on('accept', function(res) {
	var node_id = res.node_id
	var uuid = res.uuid
	console.log("Accept", node_id, "from", uuid)
})

//Có lỗi thì nó sẽ báo cho bạn ở đây, ví dụ như mã token bị sai nè... bạn sẽ code thêm vào!
socket.on('not_accept', function(res) {
	console.log("ERROR")
	var node_id = res.node_id
	var error = res.error
	console.log(node_id, error)
})

//Khi có data thì bạn sẽ lắng nghe được ở hàm này, if else xử lý thôi ^_^
socket.on('data', function(res) {
	var node_id = res.node_id
	var data = res.data
	console.log(node_id, data)
	
	if (node_id == sensorJson.node_id) {
		var value = parseFloat(data[0].state, 10) //Mình sẽ đọc là số thực và chỉ đọc từ cảm biến đầu tiên mà thôi (vì dùng có một cảm biến)
		console.log(value)
		if (value >= 15) {
			var options = {
			  uri: 'https://connect.mysmarthome.vn/api/1.0/request/' + lightJson.uuid + '/' + lightJson.node_id + '/' + lightJson.token + '/req_device_toggle',
			  method: 'POST',
			  json: {
				"id": 0,
				"command": "ON" 
			  }
			};

			request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
				console.log("POST toggle", body) // in kết quả ra
			  }
			});
		} else if (value <= 8) {
			var options = {
			  uri: 'https://connect.mysmarthome.vn/api/1.0/request/' + lightJson.uuid + '/' + lightJson.node_id + '/' + lightJson.token + '/req_device_toggle',
			  method: 'POST',
			  json: {
				"id": 0,
				"command": "OFF"
			  }
			};

			request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
				console.log("POST toggle", body) // in kết quả ra
			  }
			});
		}
	}
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

setInterval(function() {
	var options = {
	  uri: 'https://connect.mysmarthome.vn/api/1.0/request/' + sensorJson.uuid + '/' + sensorJson.node_id + '/' + sensorJson.token + '/req_device',
	  method: 'GET'
	};

	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		console.log("SEND GET sensor", body) // Print the shortened url.
	  }
	});
}, 1000) //Mỗi 1s check thùng nước một lần, hệ thống sẽ tự động gửi data lên sau 1s