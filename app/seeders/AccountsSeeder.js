const seeder = require('mongoose-seed');
const dbConfig = require('../../config/DatabaseConfig.js');
var md5Hash = require('md5-hash');

let items = [{
  username: 'admin',
  password: md5Hash.default('admin'),
  firstname: 'Supper',
  lastname: 'Admin',
  role: 'Admin'
},{
  username: 'ncbinh21',
  password: md5Hash.default('alo113'),
  firstname: 'Nguyen',
  lastname: 'Binh',
  role: 'Customer'
}];

let data = [{
    'model': 'Accounts',
    'documents': items
}]

// connect mongodb
seeder.connect(dbConfig.url, function() {
  seeder.loadModels([
    '../hotel_app/app/models/AccountsModel'  // load mongoose model 
  ]);
  seeder.clearModels(['Accounts'], function() {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});