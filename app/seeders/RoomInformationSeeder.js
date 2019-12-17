const seeder = require('mongoose-seed');
const dbConfig = require('../../config/DatabaseConfig.js');

let items = [
  {
    title: 'Paris Room',
    content: 'Boss come VN (Government)',
    url: '',
    price: 10000,
    type: 'Platinum',
    size: '3-5',
    status: 1
  },
  {
    title: 'Italia Room',
    content: 'Only for Vip come from Viet Nam',
    url: '',
    price: 8000,
    type: 'Diamond',
    size: '1-2',
    status: 1
  },
  {
    title: 'New York Room',
    content: 'Vip when register will receive combo go to restaurant 4 stars',
    url: '',
    price: 7000,
    type: 'Gold',
    size: '1-2',
    status: 1
  },
  {
    title: 'Thai Lan Room',
    content: 'This room only hire maximum 3 days',
    url: '',
    price: 2700,
    type: 'Silver',
    size: '2-4',
    status: 1
  },
  {
    title: 'Ha Noi Room',
    content: 'Support dinner buffet, and 1 fly ticket from Ha Noi to Da Nang',
    url: '',
    price: 1500,
    type: 'Bronze',
    size: '1-2',
    status: 0
  },
  {
    title: 'Mui Ne Room',
    content: 'No content',
    url: '',
    price: 3000,
    type: 'Silver',
    size: '1-2',
    status: 1
  },
  {
    title: 'Ha Long Room',
    content: 'Give free massage when go to in June',
    url: '',
    price: 6000,
    type: 'Gold',
    size: '1-2',
    status: 0
  }
];

let data = [{
    'model': 'RoomInformation',
    'documents': items
}]

// connect mongodb
seeder.connect(dbConfig.url, function() {
  seeder.loadModels([
    '../hotel_app/app/models/RoomInformationModel'  // load mongoose model 
  ]);
  seeder.clearModels(['RoomInformation'], function() {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});