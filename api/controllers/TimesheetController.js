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
  },
    
   
  new: function(req, res) {
      console.log('Gravando Time Sheet');
        Timesheet.create({
              data: req.param('data'),
              owner: req.param('owner'),
              project: req.param('project'),
              quantityTime: req.param('quantityTime'),
              description: req.param('description')
            }, function userCreated(err, newTimesheet) {
              if (err) 
               return res.json({
                err: "Erro ao Gravar!"
              });
              

              Timesheet.findOne(newTimesheet.id).populate('owner').exec(function userCreated(err, newTime) {
              if (err) 
               return res.json({
                err: "Erro ao Gravar!"
              });
              var projectId = req.param('project');
            
              var ownerName =  newTime.owner.name;

              Email.sendTimeSheet(ownerName, req.param('data'),projectId.name, req.param('quantityTime'),req.param('description'));
    
              return res.ok();  
              
  
            });
        
            
  
          });
      }
             
             
};

