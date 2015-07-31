import <%= componentNamePascalCase %> from "../lib/<%= name %>.js";
import chai from "chai";
chai.should();

describe("<%= componentNamePascalCase %>", () => {
	let component;

	before(() => {
		component = new <%= componentNamePascalCase %>();
	});

	it("should say something", () => {
		component.saySomething().should.equal("Something");
	});
});
