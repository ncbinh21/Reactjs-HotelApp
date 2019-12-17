const seeder = require('mongoose-seed');
const dbConfig = require('../../config/DatabaseConfig.js');

let items = [{type: 'Platinum'}, {type: 'Diamond'}, {type: 'Gold'},{type: 'Silver'},{type: 'Bronze'}];

let data = [{
    'model': 'RoomType',
    'documents': items
}]

// connect mongodb
seeder.connect(dbConfig.url, function() {
  seeder.loadModels([
    '../hotel_app/app/models/RoomTypeModel'  // load mongoose model 
  ]);
  seeder.clearModels(['RoomType'], function() {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});