/// <reference types="cypress" />

describe("todo", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Email Address")
      .parent()
      .find("input[type=text]")
      .type("test@test.com");
    cy.get("input[type='submit']").click();
  });

  // it("can type a description into the title input field and the text will show", () => {
  //   cy.contains("Title")
  //     .parent()
  //     .find("input[type=text]")
  //     .type("Test title")
  //     .should("have.value", "Test title");
  // });

  it("can type a description into the input field and the text will show", () => {
    // cy.contains("Title")
    //   .parent()
    //   .find("input[type=text]")
    //   .type("Test title")
    //   .should("have.value", "Test title");

    // cy.contains("Your tasks, Phil Johnson").should(
    //   "have.value",
    //   "Your tasks, Phil Johnson"
    // );
    cy.get("ul").first().click();
    cy.get("input[type=text]")
      .last()
      .type("Test description")
      .should("have.value", "Test description");
  });

  // it("can add new todo item when the input field has a value", () => {
  //   cy.contains("Title").parent().find("input[type=text]").type("Test title");
  //   cy.get("input[type='submit']").click();
  //   cy.get("ul").last().click();
  //   cy.contains("Test title").should("be.visible");
  // });

  // it("can not add new todo item when the input field has no value", () => {
  //   // Item is not added
  //   cy.get("img")
  //     .its("length")
  //     .then((prevTodoLength) => {
  //       cy.get("input[type='submit']").click({ force: true });
  //       cy.get("img").its("length").should("eq", prevTodoLength);
  //     });
  // });

  // it("can not add new todo item when the input field has no value (border turns red)", () => {
  //   cy.get("input[type='submit']").click({ force: true });
  //   cy.contains("Title")
  //     .parent()
  //     .find("input[type=text]")
  //     .should("have.css", "border-color", "red");
  // });

  // describe("item as completed", () => {
  //   beforeEach(() => {
  //     cy.contains("Title")
  //       .parent()
  //       .find("input[type=text]")
  //       .type("Will be completed");
  //     cy.get("input[type='submit']").click();
  //   });

  //   it("can set an item as completed", () => {
  //     cy.get("ul").last().click();
  //   });

  //   afterEach(() => {
  //     cy.get("ul").last().click;
  //   });
  // });

  // it("can set an item as incompleted", () => {});

  // it("can delete an item", () => {});
});
