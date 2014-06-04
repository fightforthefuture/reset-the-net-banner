var animations = {
	main: {
		options: {
			debug: false,
		},
		init: function(options) {
			for (var k in options) this.options[k] = options[k];
			return this;
		},
		start: function() {
			this.log('RTN ANIMATION STARTING');
		},
		log: function() {
			if (this.options.debug)
				console.log.apply(console, arguments);
		}
	}
}

window.addEventListener('message', function(e) {
	if (!e.data || !e.data.RTN_banner_MSG)
		return;

	delete e.data.RTN_banner_MSG;

	switch (e.data.requestType) {
		case 'putAnimation':
			animations[e.data.modalAnimation].init(e.data).start();
			break;
	}
});

var sendMessage = function(requestType, data)
{
	data || (data = {});
	data.requestType = requestType;
	data.RTN_IFRAME_MSG = true;
	parent.postMessage(data, '*');
}

var shutdown = function(e) {
	sendMessage('stop');
};

$(document).ready(function() {
	sendMessage('getAnimation');

	// Shutdown, when required.
	$('.close').on('mousedown', shutdown);
	$('a').on('click', shutdown);
});

window.setTimeout(function() {
	$('.container').css('opacity', 1);
}, 1000);
