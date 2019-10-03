var fs = require('fs');
var requestCount = 0;
exports.reqCount = function () {
	requestCount++;
	fs.writeFile("reqCount.txt", requestCount, function (err) {
		if (err) throw err
	});
}