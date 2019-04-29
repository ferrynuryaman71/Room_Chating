var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct messaage object', () => {
		var from = 'ferry';
		var text = 'welcome to the chat app';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, text});
	});
});


describe('generateLocationMessage', () => {
	it('should generate correct message object', () => {
		var from = 'Admin';
		var latitude = 11;
		var longitude = 12;
		var url = 'https://www.google.com/maps?q=11,12';
		var message = generateLocationMessage(from, latitude, longitude); 
	
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, url});
	});
});