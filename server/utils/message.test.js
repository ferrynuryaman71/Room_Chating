var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct messaage object', () => {
		var from = 'ferry',
		var text = 'welcome to the chat app',
		var message = generateMessage(from, text);

		expect(message.createdAd).toBeA('number');
		expect(message).toInclude({from, text});
	})
})


// describe('generateLocationMessage', () => {
// 	it('should generate correct message object', () => {
 
// 	})
// })