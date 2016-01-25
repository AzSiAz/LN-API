const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
var utils = require('../server/utils/utils');

chai.use(require('chai3-json-schema'));
chai.use(require('chai-http'));

describe("utils.js test", function() {
	it("utils.get should work correctly", function() {
        return 1;
	})
})