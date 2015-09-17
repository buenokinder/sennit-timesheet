/**
* Ativo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

 name: {
            type: 'string',
            required: true
        },
       serialNumber: {
            type: 'string',
            required: true
        },
       assetNumber: {
            type: 'string',
            required: true
        }, 
      model: {
            type: 'string',
            required: true
        },
       size: {
            type: 'string',
            required: true
        }, 
        description: {
            type: 'string',
            required: true
        },
        type: {
        model: 'tipoAtivo'
      }, owner: {
        model: 'user'
      }
  }
};

