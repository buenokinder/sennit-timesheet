/**
* Attachedfiles.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    filename: {
      type: 'string',
      required: true,
    },
    type: {
      type: 'string',
      required: true
    },
      size: {
      type: 'integer',
      required: true
    },
      helpdesk: {
            model: 'helpdesk',
            via: 'attachedfiles'
      }
  }
};

