/**
 *	@overview JSDoc 3
 *	@copyright 2010 (c) Michael Mathews <micmath@gmail.com>
 *	@license See LICENSE.md file included in this distribution.
 */

//// bootstrap
	const BASEDIR = arguments[0].replace(/([\/\\])main\.js$/, '$1'); // jsdoc.jar sets argument[0] to the abspath to main.js
	var args = arguments.slice(1);
	
	/** Follow the commonjs modules convention. */
	function require(id) {
		var path = require.base + id + '.js',
			source = '';
			
		try {
			var file = new java.io.File(path),
				scanner = new java.util.Scanner(file).useDelimiter("\\Z"),
				source = String( scanner.next() );
		}
		catch(e) { print(e); }
		
		try {
			var f = new Function('require', 'exports', 'module', source),
				exports = require.cache[path] || {},
				module = { id: id, uri: path };
				
			require.cache[path] = exports;
			f.call({}, require, exports, module);
		}
		catch(e) {
			print('Unable to require source code from '+source+': '+e);
		}
		return exports;
	}
	require.base = BASEDIR + '/modules/';
	require.cache = {};
	
	function print(msg) {
		java.lang.System.out.println(msg);
	}
////

//// main
	var app = { }; // global settings for this app
	(function() {
		var jsdoc = {
				parser: require('jsdoc/parser'),
				opts: require('jsdoc/opts'),
				src: require('jsdoc/src')
			},
			opts,
			sourceFiles;
		
		app.opts = opts = jsdoc.opts.set(args);
		
		if (opts.help) {
			print( jsdoc.opts.help() );
			java.lang.System.exit(0);
		}
		else if (opts.test) {
			load(BASEDIR+'/test/lib/jspec.js');
			load(BASEDIR + '/test/runall.js');
			java.lang.System.exit(0);
		}
		
		if (opts._.length > 0) {
			sourceFiles = jsdoc.src.getFilePaths(opts._);
	
			jsdoc.parser.parseFiles(sourceFiles, opts.encoding);
			
			if (opts.validate) {
				var jsonSchema  = require('sitepen/jsonSchema');
				var jsdocSchema = require('jsdoc/schema').jsdocSchema;
				var validation = jsonSchema.validate(jsdoc.parser.result.toObject(), jsdocSchema);
				print('Validation: ' + validation.toSource());
			}
			
			if (!opts.destination || opts.destination.indexOf('stdout') === 0) {
				print( jsdoc.parser.result.toString(opts.destination) );
			}
			else if (opts.template) {
				try {
					load(BASEDIR+'/templates/'+opts.template+'/publish.js');
				}
				catch (e) {
					print('Cannot load the specified template: templates/'+opts.template+'/publish.js: '+e);
				}
				
				publish(jsdoc.parser.result.toObject(), {});
			}
		}
		
		
		
	})();
////