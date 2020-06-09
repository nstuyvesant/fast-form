// https://docs.cypress.io/api/introduction/api.html

describe("E2E testing of Fast Form Designer", () => {
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
    cy.get("#name").should("have.class", "is-valid");
  });

  it("Clears section name and error appears", () => {
    cy.get("#sectionName").clear();
    cy.contains("div", "You must provide a name for this section.");
  });

  it("Sets section name and error disappears", () => {
    cy.get("#sectionName").type("Section Test");
    cy.get("#sectionName").should("have.class", "is-valid");
  });

  it("Deletes section and error appears", () => {
    cy.get(".delete-section").click();
    cy.contains("div", "At least one section must be added.");
  });

  it("Adds section and hides error", () => {
    cy.get(".add-section").click();
    cy.get("#sectionFeedback").should("have.css", "display", "none");
  });

  it("Adds subsection", () => {
    cy.get(".add-subsection").first().click();
    cy.get("input#sectionName").eq(1); // means there should be a second input with the id sectionName
  });

  it("Deletes subsection", () => {
    cy.get(".delete-section").eq(1).click();
  });

  it("Converts questions in textarea to rows, clears textarea and error", () => {
    cy.get(".questions").type("One\nTwo\nThree");
    cy.get(".check").click();
    cy.get(".questions").should("have.text", "");
    cy.get("#questionsFeedback").should("have.css", "display", "none");
  });

  it("Displays error when question label is cleared", () => {
    cy.get(".fifty-three").first().clear();
    cy.get("#questionLabelFeedback")
      .first()
      .should("have.css", "display", "block");
  });

  it("Hides error when question label is entered", () => {
    cy.get(".fifty-three").first().type("One");
    cy.get("#questionLabelFeedback")
      .first()
      .should("have.css", "display", "none");
  });

  it("Makes row disappear when question is deleted", () => {
    cy.get(".dropdown").first().click();
    cy.get(".delete").first().click();
    cy.get(".fifty-three").first().should("have.value", "Two");
  });

  it("Types question into textarea and converts to row after clicking check", () => {
    cy.get(".questions").type("Four");
    cy.get(".check").click();
    cy.get(".fifty-three").last().should("have.value", "Four");
  });

  it("Edit Values displays modal", () => {
    cy.get(".dropdown").first().click();
    cy.get(".edit").first().click();
    cy.contains("h5", "Edit List Values");
  });

  it("Converts textarea rows to value array elements", () => {
    const testData = "Alpha\nBeta\nGamma";
    cy.get(".values").type(testData);
    cy.contains("button", "OK").click();
    cy.get(".dropdown").first().click();
    cy.get(".edit").first().click();
    cy.get(".values").should("have.value", testData);
    cy.contains("button", "OK").click();
  });

  it("Changes data type of a question", () => {
    const testData = "Phone";
    cy.get(".custom-select").first().select(testData);
    cy.get(".custom-select").first().should("have.value", testData);
  });

  it("Checks required checkbox", () => {
    cy.get(".required").first().click();
    cy.get(".required").first().should("have.checked", true);
  });

  it("Displays alert when Preview button is clicked", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("#preview")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Preview (TBD)");
      });
  });

  it("Downloads JSON, reloads page to clear, Uploads JSON", () => {
    cy.get("#download").click();
    cy.reload();
    cy.get(".upload").click();
    // TODO: upload form.json from Downloads folder where the earlier step deposited form
    // cy.fixture('~/Downloads/form.json').as('form')
    //   .get('input[type=file]').then(function(el) {
    //     return Cypress.Blob.base64StringToBlob(this.form, 'text/plain')
    //       .then(blob => {
    //         el[0].files[0] = blob
    //         el[0].dispatchEvent(new Event('change', {bubbles: true}))
    //       })
    //   });
  });
});
