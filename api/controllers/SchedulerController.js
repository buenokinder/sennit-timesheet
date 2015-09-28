/**
 * SchedulerController
 *
 * @description :: Server-side logic for managing schedulers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

// 	start: function(req, res) {
// 		
// 			var scheduler = { 'status': 'started'};
// 
//    			Agenda = require('agenda');
//     		var agenda = new Agenda({db: { address: 'localhost:27017/SennitScheduler'}}).processEvery('1 minutes');
// 
//     		console.log('entrando no start');
// 			agenda.define('SendMailTimesheet', function(job, done) {
// 				console.log('Start SendMailTimesheet job')
// 				User.find().exec(function(err, usuarios){
// 					console.log(usuarios);
// 					for (var i = 0; i < usuarios.length; i++) {
// 				
// 					var data = new Date();
// 						Email.sendTimeSheetDay(usuarios[i].name, usuarios[i].email, data);
// 					}
// 					
// 					
// 				});
// 				
//   				console.log('Email TimeSheet Diparado com sucesso!');
// 			});
// 
// 			agenda.every('30 16 * * *', 'SendMailTimesheet');
// 
// 
// 			agenda.start();
// 			console.log('retornando');
//         	res.send(scheduler);
//       
//     
//   	}
	   
};

