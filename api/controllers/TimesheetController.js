/**
 * TimesheetController
 *
 * @description :: Server-side logic for managing timesheets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findByDate: function(req, res) {
    var name = req.param('date');
    Timesheet.findByName(name).done(function (err, users) {
      if (err) {
        res.send(400);
      } else {
        res.send(users);
      }
    });
  }
};

