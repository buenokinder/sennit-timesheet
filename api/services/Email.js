module.exports = {
    sendTimeSheet: function(senderName, data,project,hours, description){
        sails.hooks.email.send(
                "testEmail",
                {
                    recipientName: "Joe",
                    senderName: senderName,
                    data: data,
                    projeto: project,
                    horas: hours,
                    description: description
                },
                {
                to: "carlos@sennit.com.br;ronaldo@sennit.com.br",
                subject: "Lançamento de horas Timesheet" 
                },
                    function(err) {
                        console.log(err);
                    }
                );
    },sendTimeSheetDay: function(senderName, to,data){
        sails.hooks.email.send(
                "timeSheetUnknow",
                {
                    senderName: senderName,
                    data: data
                },
                {
                to: to,
                subject: "Lançamento de horas Timesheet" 
                },
                    function(err) {
                        console.log(err);
                    }
                );
    },sendHelpDesk: function(senderName, data,description,to,type, priority , number){
        sails.hooks.email.send(
                "openTicketEmail",
                {
                    recipientName: "Joe",
                    senderName: senderName,
                    data: data,
                    description: description,
                    type: type,
                    priority: priority,
                    number: number
                },
                {
                to: to,
                subject: "Chamado de numero " + number + " foi aberto por " + senderName
                },
                    function(err) {
                        console.log(err);
                    }
                );
    },sendHelpDeskUser: function(senderName, data,description,to,type, priority , number){
        sails.hooks.email.send(
                "openerTicketEmail",
                {
                    recipientName: "Joe",
                    senderName: senderName,
                    data: data,
                    description: description,
                    type: type,
                    priority: priority,
                    number: number
                },
                {
                to: to,
                subject: "Seu chamado foi aberto com o numero " + number 
                },
                    function(err) {
                        console.log(err);
                    }
                );
    }


}

