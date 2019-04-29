var generateMessage = (from, text) => {
	return {
		from,
		text,
		createAd: new Date().getTime()
	};
};

module.exports = {generateMessage}