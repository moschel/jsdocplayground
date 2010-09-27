(function() {
	var jsdoc,
		doclet;
	
	JSpec.describe('jsdoc/doclet.js', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = { parser: require('jsdoc/parser') };
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/05_jsdoc_doclet.js');
			doclet = jsdoc.parser.result[0];
		});
		
		describe('The doclet object', function() {
			it('should be a doclet', function() {
				expect(doclet.constructor.name).to(eql, 'Doclet');
			});
			
			it('should have a `tagValue` method', function() {
				expect(doclet).to(respond_to, 'toObject');
			});
			
			it('should have a `hasTag` method', function() {
				expect(doclet).to(respond_to, 'toObject');
			});
			
			it('should have a `tags` property which is an array', function() {
				expect(doclet).to(have_property, 'tags');
				expect(doclet.tags).to(be_an, Array);
			});
			
			it('should have a `meta` property which is an object', function() {
				expect(doclet).to(have_property, 'meta');
				expect(doclet.meta).to(be_an, Object);
			});
		});
		
		describe('The returned value of jsdoc.Doclet#tagValue', function() {
			it('should be a string', function() {
				var returnedValue = doclet.tagValue('name');
				expect(returnedValue).to(be_a, String);
			});
			
			it('should be the text of the tag that matches the given tag name', function() {
				var returnedValue = doclet.tagValue('name');
				expect(returnedValue).to(eql, 'Foo');
			});
			
			it('should be the text of the first tag that matches the given tag name if there are more than 1', function() {
				var returnedValue = doclet.tagValue('param');
				expect(returnedValue).to(eql, 'a');
			});
		});
		
		describe('The jsdoc.Doclet#hasTag method', function() {
			it('should return a boolean', function() {
				var returnedValue = doclet.hasTag('name');
				expect(returnedValue).to(be_a, Boolean);
			});
			
			it('should return true if the tag exists', function() {
				var returnedValue = doclet.hasTag('param');
				expect(returnedValue).to(eql, true);
			});
			
			it('should return true even if the tag was generated by JSDoc', function() {
				var returnedValue = doclet.hasTag('name');
				expect(returnedValue).to(eql, true);
			});
			
			it('should return false if the tag does not exist', function() {
				var returnedValue = doclet.hasTag('unicorns');
				expect(returnedValue).to(eql, false);
			});
		});
	});
})();

(function testarea() {

	/**
		@constructor Foo
		@param a
		@param b
	*/

})();