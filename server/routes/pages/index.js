'use strict';

const Handler = require('../../handlers/pages/index');
const Validator = require('../../handlers/pages/validator');

module.exports = [

    // expose static files
    {
        method: 'GET',
        path: '/public/{path*}',
        handler: {
            directory: {
                path: './public',
                listing: false,
                index: false
            }
        }
    },

    // index
    {
        method: 'GET',
        path: '/',
        handler: Handler.index,
        // config: {
        //     validate: Validator.index
        // }
    }
];
