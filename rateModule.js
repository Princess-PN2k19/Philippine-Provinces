var fs = require('fs');
exports.rateModule = function (req, res) {
	var rate = req.query.rating;
	var province ='./province/'+req.query.shortname + '.json';
	var content;
	var data = fs.readFileSync(province);
	content = JSON.parse(data);
	var newRating = content.rating;
	if (newRating == "0") {
		content.rating = rate;
	} else {
		newRating = Number(content.rating) + Number(rate);
		content.rating = newRating;
		content.rating = Number(Number(newRating / 2).toFixed(2));
	}
	fs.writeFile(province, JSON.stringify(content), function(err){
		if (err) throw err
	})
	res.end("" + content.rating);
};