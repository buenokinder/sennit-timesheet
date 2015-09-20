/**
* Helpdesk.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
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
        type: 'string'
      },type:{
        model: 'typehelpdesk'
      }, priority:   {
        type: 'string'
     }
  }
};

