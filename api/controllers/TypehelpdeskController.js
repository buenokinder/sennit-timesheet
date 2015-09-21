/**
 * TypehelpdeskController
 *
 * @description :: Server-side logic for managing typehelpdesks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
     new: function(req, res) {
        Typehelpdesk.create({
              name: req.param('name'),
            }, function userCreated(err, newTypehelpdesk) {
              if (err) 
               return res.json({
                err: "Erro ao Gravar!"
              });

            console.log('Gravando Typehelpdesk');
            console.log(req.param('users'));
            newTypehelpdesk.users.add(req.param('users'));

  
            newTypehelpdesk.save(function(err) {
                return res.json({
                    id: err
                });
  
            });
             
             
    
  });
     },
    
    deleteAssossiation: function(req, res) {
        Typehelpdesk.findOne(req.param('id')).exec(function userCreated(err, newTypehelpdesk) {
              if (err) 
               return res.json({
                err: "Erro ao Gravar!"
              });

            newTypehelpdesk.users.remove(req.param('user'));

  
            newTypehelpdesk.save(function(err) {
                return res.json({
                    id: err
                });
  
            });
        });
     },
    
    addAssossiation: function(req, res) {
        Typehelpdesk.findOne(req.param('id')).exec(function userCreated(err, newTypehelpdesk) {
              if (err) 
               return res.json({
                err: "Erro ao Gravar!"
              });

            newTypehelpdesk.users.add(req.param('users'));

  
            newTypehelpdesk.save(function(err) {
                return res.json({
                    id: err
                });
  
            });
        });
     }
	
};

