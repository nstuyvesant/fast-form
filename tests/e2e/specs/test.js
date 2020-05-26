// https://docs.cypress.io/api/introduction/api.html

describe("Initial test", () => {
  it("Visits the app root url and ensures default content is there", () => {
    cy.visit("/");
    // Validate default content
    cy.contains("div", "Fast Form");
    cy.contains("label", "Upload");
    cy.contains("button", "Preview");
    cy.contains("button", "Download");
    cy.contains("button", "Delete Section");
    cy.contains("button", "Add Subsection");
    cy.contains("button", "Add Section");
    cy.get("#name").should("have.value", "Form");
    cy.get("#sectionName").should("have.value", "Section 1");
    cy.contains("div", "At least one question must be added.");
  });

  it("Clears form name and error appears", () => {
    cy.get("#name").clear();
    cy.contains("div", "You must provide a name for this form.");
  });

  it("Sets form name and error disappears", () => {
    cy.get("#name").type("Form Test");
    cy.get("#name").should("have.class","is-valid");
  });

  it("Clears section name and error appears", () => {
    cy.get("#sectionName").clear();
    cy.contains("div", "You must provide a name for this section.");
  });

  it("Sets section name and error disappears", () => {
    cy.get("#sectionName").type("Section Test");
    cy.get("#sectionName").should("have.class","is-valid");
  });

  it("Deletes section and error appears", () => {
    cy.get(".delete-section").click();
    cy.contains("div", "At least one section must be added.");
  });

  it("Adds section and error disappears", () => {
    cy.get(".add-section").click();
    cy.get("#sectionFeedback").should("have.css", "display", "none");
  });

  it("Questions in textarea convert to rows and clear textarea and error", () => {
    cy.get(".questions").type("One\nTwo\nThree");
    cy.get(".check").click();
    cy.get(".questions").should("have.text", "");
    cy.get("#questionsFeedback").should("have.css", "display", "none");
  });

  it("Clearing question label shows error", () => {
    cy.get(".fifty-three").first().clear();
    cy.get("#questionLabelFeedback").first().should("have.css", "display", "block");
  });

  it("Entering question label makes error disappear", () => {
    cy.get(".fifty-three").first().type("One");
    cy.get("#questionLabelFeedback").first().should("have.css", "display", "none");
  });

  it("Deleting question makes row disappear", () => {
    cy.get(".dropdown").first().click();
    cy.get(".delete").first().click();
    cy.get(".fifty-three").first().should("have.value", "Two");
  });

  it("Adding a new question to the textarea and clicking check adds to the end", () => {
    cy.get(".questions").type("Four");
    cy.get(".check").click();
    cy.get(".fifty-three").last().should("have.value", "Four");
  });

  it("Edit Values displays modal", () => {
    cy.get(".dropdown").first().click();
    cy.get(".edit").first().click();
    cy.contains("h5","Edit List Values");
  });

  it("Typing values into textarea and clicking OK saves array elements", () => {
    const testData = "Alpha\nBeta\nGamma";
    cy.get(".values").type(testData);
    cy.contains("button", "OK").click();
    cy.get(".dropdown").first().click();
    cy.get(".edit").first().click();
    cy.get(".values").should("have.value", testData)
    cy.contains("button", "OK").click();
  });

  it("Changing data type of a question works", () => {
    const testData = "Phone";
    cy.get(".custom-select").first().select(testData);
    cy.get(".custom-select").first().should("have.value", testData);
  });

  it("Checking required checkbox works", () => {
    cy.get(".required").first().click();
    cy.get(".required").first().should("have.checked", true);
  });

  it("Clicking Preview button displays alert", () => {
    const stub = cy.stub()  
    cy.on ("window:alert", stub)
    cy
      .get("#preview").click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Preview (TBD)');
    })  
  });

  // Download JSON of form

  // Refresh webpage then Upload JSON and verify it loaded

});
