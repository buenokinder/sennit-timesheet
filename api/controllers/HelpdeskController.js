/**
 * HelpdeskController
 *
 * @description :: Server-side logic for managing helpdesks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
//   findAtendimentoUsuario: function (req, res) {
//  
//     var params = req.params.all();
//     console.log('foi');
// return res.json([{}]);
//     User.findOne(params.id).populate('typehelpdesks').exec(function(err, users){
//       
//         res.send(users);
// 
//       var parameter;
//       for (var i = 0; i < users.typehelpdesks.length; i++) {
//         if(parameter)
//             parameter += ', { "type": "' + users.typehelpdesks[i].id + '" }';
//           else  
//             parameter = '[{ "type": "' + users.typehelpdesks[i].id + '"}';
//       }
//       if(!parameter)
//         return res.json([{}]);
//       parameter+="]";
//       console.log(parameter);
//     Helpdesk.find().where(JSON.parse(parameter)).exec(function (err, helpdesk){
//       if (err) {
//         return res.negotiate(err);
//       }
// 
//       res.send(helpdesk);
// 
//       
//     });
//     });
//     
//   },
// 
// 	create: function(req, res, next) {
// 
//       var params = req.params.all();
//       params.status = 'aberto';
//     	Helpdesk.create(params, function(err, helpdesk) {
// 
//         	if (err) return next(err);
// 
// 			
// 
//          Helpdesk.findOne(helpdesk.id).populate('owner').exec(function userCreated(err, newHelp) {
//               if (err) 
//                return res.json({
//                 err: "Erro ao Gravar!"
//               });
//            
//            var typehelpdesk = req.param('type');
//          
// 			var to;
// 			for (var i = 0; i < typehelpdesk.users.length; i++) {
// 				if(to)
//     				to += typehelpdesk.users[i].email + ";";
//     			else	
//     				to = typehelpdesk.users[i].email + ";";
// 			}
// 				console.log(newHelp);
//             	console.log(to);
//               	var ownerName =  newHelp.owner.name;
// 
//   			  	Email.sendHelpDesk(ownerName, newHelp.createdAt ,newHelp.description, to, typehelpdesk.name, newHelp.priority , newHelp.number);
//     			Email.sendHelpDeskUser(ownerName, newHelp.createdAt ,newHelp.description, newHelp.owner.email , typehelpdesk.name, newHelp.priority , newHelp.number);
//               	res.status(201);
// 
//         	  	res.json(helpdesk);
//               
//   
//             });
//           
// 
//         	
// 
//     	});
// 	}
};

