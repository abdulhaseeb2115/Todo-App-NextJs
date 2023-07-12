describe("Todo List Test", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
	});

	// should display LoginScreen component
	it("app should display LoginScreen component", () => {
		cy.get(".LoginScreen").should("exist");
	});

	// should display "Todo-App" initially
	it('app should display "Todo-App" text', () => {
		cy.contains("Todo-App");
	});

	// should contain a Btn element
	it("app should have a Button element", () => {
		cy.get("button").should("exist");
	});

	// should contain Input element
	it("app should have Input element", () => {
		cy.get("input").should("exist");
	});

	// should display "Go to Sign Up" initially
	it('app should display "Go to Sign Up" text', () => {
		cy.contains("Go to Sign Up");
	});
});
