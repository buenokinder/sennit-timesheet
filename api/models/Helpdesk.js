/**
* Helpdesk.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  
  attributes: {

    number: {
      type: 'integer'
    },
    shortdescription: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    }, 
      histories:{
            collection: 'helpdeskhistory',
            via: 'helpdesk'
        },
      attachedfiles:{
            collection: 'attachedfiles',
            via: 'helpdesk'
      },
      owner: {
        model: 'user'
      },
      helperuser: {
        model: 'user'
      },
      status :{
        type: 'string',
        required: true,
        enum: ['aberto', 'aceito', 'analise','andamento', 'concluido', 'encerrado' ]
      },type:{
        model: 'typehelpdesk'
      }, priority:   {
        type: 'string'
     }
  },
    beforeCreate : function (values, cb) {

        // add seq number, use
        Sequence.next("order", function(err, num) {

            if (err) return cb(err);

            values.number = num;

            cb();
        });
    }
};

