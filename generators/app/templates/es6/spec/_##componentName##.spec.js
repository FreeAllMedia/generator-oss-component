import <%= componentNamePascalCase %> from "../lib/<%= name %>.js";

describe("<%= componentNamePascalCase %>", () => {
	let component;

	before(() => {
		component = new <%= componentNamePascalCase %>();
	});

	it("should say something", () => {
		component.saySomething().should.equal("Something");
	});
});
