'use strict';

//var IndexModel = require('../models/index');
let InputModel = require('../models/input');
let Start = require('../models/start');
//let StartController = require('./start');


module.exports = function (router) {

    var model = new InputModel();        
    //console.log('Model em Index: ' + model.terreno);

    router.get('/', function (req, res) {
        
        //console.log(model);
        Start(model);
        //StartController(model);
        res.render('input', model);

    });

};
