/**
 * HelpdeskController
 *
 * @description :: Server-side logic for managing helpdesks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res, next) {

    var params = req.params.all();

    	Helpdesk.create(params, function(err, helpdesk) {

        	if (err) return next(err);

        	res.status(201);

        	res.json(helpdesk);

    	});
	}
};

