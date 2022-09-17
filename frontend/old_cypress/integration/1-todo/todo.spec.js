/// <reference types="cypress" />

describe("todo", () => {
  beforeEach(() => {
    cy.visit("https://localhost:5000");
    cy.contains("Email Address").find("input[type=text]").type("test@test.com");
    cy.get("button").click();
  });

  it("can type a description into the title input field and the text will show", () => {
    cy.contains("Title").find("input[type=text]").type("Test title");

    cy.contains("Title")
      .find("input[type=text]")
      .type("Test title")
      .should("have.text", "Test title");
  });

  it("can add new todo item when the input field has a value", () => {});

  it("can not add new todo item when the input field has no value", () => {});

  it("can set an item as completed", () => {});

  it("can set an item as incompleted", () => {});

  it("can delete an item", () => {});
});
