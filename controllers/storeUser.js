const User = require("../database/models/User");

module.exports = function (req, res) {
	User.create(req.body, (error, user) => {
		if (error) return res.redirect("/auth/register");
        res.redirect('/')
	});
};
