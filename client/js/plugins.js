// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
    

	if( typeof(window.console) == 'undefined' || !window.console )
		window.console = window.console || {};

	console.log = console.log || function(){};
	console.debug = console.debug || console.log;

	console.groupCollapsed = console.groupCollapsed || function(){};
	console.group = console.group || function(){};
	console.groupEnd = console.groupEnd || function(){};

	/**
	 * Shape should show the console in a better way
	 *
	 * @param args      Object  Args to send to native console
	 * @param scope     string  Group name
	 * @param color     string  Hex (RGB) -> '#FFFFFF'
	 * @param collapsed bool    Whether collapsed or not
	 */
	console.shape = function( args, scope, color, collapsed ){

		// # of elements to show
		var start = 0;
		// Default color
		color = color || '#999';

		if( typeof( args ) != 'object' )
			args = [args];

		// There is no point on grouping just one element
		if( args.length == 1 && typeof( args[start] ) != 'object') {
			if( scope )
				console.log('%c' + scope + ': ' + args[start], 'color: ' + color);
			else
				console.log('%c' + args[start], 'color: ' + color);
			return;
		}

		if( scope ) {
			var append = ( typeof( args[start] ) != 'object' ? ' ' + args[start++] : '' );

			if( collapsed )
				console.groupCollapsed('%c' + scope + ':' + append, 'color: ' + color);
			else
				console.group('%c' + scope + ':' + append, 'color: ' + color);
		}

		for( ;start < args.length; start ++ ) {
			console.log( args[start] );
		}

		if( scope )
			console.groupEnd( );

	};

	console.app = function(){
		console.shape(arguments, 'APP', '#6F4395', true);
	};
	console.service = function(){
		console.shape(arguments, 'SRV', '#6F9995', true);
	};
	console.controller = function(){
		console.shape(arguments, 'CTR', '#9F99FF', true);
	};
	console.user = function(){
		console.shape(arguments, 'USR', '#6F99FF', true);
	};
	console.show = function(){
		console.shape(arguments, 'SHW', '#FF4345', true);
	};

}());


