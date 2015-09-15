/**
* Timesheet.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      data: {
      type: 'date',
      required: true
    },
      owner: {
        model: 'user',
          required: true
      },
      project: {
        model: 'projects',
          required: true
      },
      quantityTime: {
        type: 'float',
        required: true
      },
      description: { 
          type: 'STRING',
          required: true
      }
  }
};
