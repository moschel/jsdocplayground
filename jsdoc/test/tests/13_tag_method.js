(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@method', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/13_tag_method.js');
			doclets = jsdoc.parser.result;
		});
		
		describe('A doclet with a named @method attached to a namespace', function() {
			it('should have an `kind` property set to "method"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'kind');
				expect(doclet.kind).to(eql, 'method');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'fah');
			});
			
			it('should have a `memberof` property set to the parent object name', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'foo');
			});
		});
		
		describe('A doclet with a named @method attached to a constructor', function() {
			it('should have an `kind` property set to "method"', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'kind');
				expect(doclet.kind).to(eql, 'method');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'bah');
			});
			
			it('should have a `memberof` property set to the parent object name', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'bar');
			});
		});
		
		describe('A doclet with a named @function tag', function() {
			it('should have an `kind` property set to "method"', function() {
				var doclet = doclets[4].toObject();
				expect(doclet).to(have_property, 'kind');
				expect(doclet.kind).to(eql, 'method');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[4].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'zub');
			});
		});
		
	});
})();

(function testarea() {

	/** @namespace foo */
	
	/** @constructor bar */
	
	/** @method foo.fah */
	
	/** @method bar.bah */
	
	/** @function zub */
	
})();