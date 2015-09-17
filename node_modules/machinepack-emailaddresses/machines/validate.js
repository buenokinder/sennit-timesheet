module.exports = {


  friendlyName: 'Validate email address',


  description: 'Determine whether or not the provided string is an email address.',


  inputs: {

    string: {
      friendlyName: 'Email address (maybe)',
      example: 'foo@foobar.com',
      description: 'The email address to validate.',
      required: true
    }

  },


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      friendlyName: 'valid email address',
      description: 'The provided string is a valid email address.'
    },

    invalid: {
      friendlyName: 'not email address',
      description: 'The provided string is not an email address.'
    }

  },


  fn: function (inputs,exits) {
    var Validator = require('validator');

    if (Validator.isEmail(inputs.string)) {
      return exits.success();
    }
    return exits.invalid();

  },



};
