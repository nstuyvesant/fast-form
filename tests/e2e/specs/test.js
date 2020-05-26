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
    cy.contains("#sectionFeedback").should("have.css","display", "none");
  });

});
