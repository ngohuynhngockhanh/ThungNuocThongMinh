
# iNut-Socket.IO-client-demo

## Cách sử dụng

Đây là project mẫu để các bạn có thể lắng nghe dữ liệu từ thiết bị iNut Platform. Cứ có data mới thì các bạn sẽ lắng nghe được. Rất dễ dàng!

Khi có sự kiện yêu cầu đăng nhập, bạn hãy gửi lệnh (emit) "register_node" với thông tin là đoạn token, uuid, node_id được lấy từ app iNut.

[![Xem hướng dẫn](https://platform.mysmarthome.vn/sites/default/files/pictures/hung_dn_ly_m_qrcode_danh_cho_lp_trnh_vien_trong_inut_platform_-_youtube_-_google_chrome.jpg)](https://www.youtube.com/watch?v=zRDmP622NUg)

```javascript
socket.on("please_login", function() {
	socket.emit('register_node', {
		"node_id":"r1O92dtSz",
		"uuid":"PsxUPldlbBNEuEUTi7Ci5yls77R2",
		"token":"301fd2e614a97927804613e73373ded2991661182107"
	})
})
```
