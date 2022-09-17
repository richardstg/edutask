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

  it("can type a description for a new todo item into the input field and the text will show", () => {
    cy.get("img").first().click();
    cy.get('input[placeholder="Add a new todo item"]')
      .type("Test description", { force: true })
      .should("have.value", "Test description");
  });

  it("can add new todo item when the input field has a value", () => {
    cy.get("img").first().click();
    cy.get('input[placeholder="Add a new todo item"]').type(
      "Test description 2",
      { force: true }
    );

    cy.get(".todo-item")
      .its("length")
      .then((prevTodoLength) => {
        const newLength = prevTodoLength + 1;
        cy.get("input[type='submit']").last().click({ force: true });
        cy.get(".todo-item").its("length").should("eq", newLength);
      });
  });

  it("can not add new todo item when the input field has no value", () => {
    cy.get("img").first().click();

    cy.get(".todo-item")
      .its("length")
      .then((prevTodoLength) => {
        cy.get("input[type='submit']").last().click({ force: true });
        cy.get(".todo-item").its("length").should("eq", prevTodoLength);
      });
  });

  it("can not add new todo item when the input field has no value (border turns red)", () => {
    cy.get("img").first().click();

    cy.get("input[type='submit']").last().click({ force: true });
    cy.get('input[placeholder="Add a new todo item"]').should(
      "have.css",
      "border-color",
      "red"
    );
  });

  describe("item completed", () => {
    beforeEach(() => {
      cy.get("img").first().click();
      cy.get('input[placeholder="Add a new todo item"]').type(
        "To be completed",
        { force: true }
      );
      cy.get("input[type='submit']").last().click({ force: true });
    });

    it("can set an item as completed", () => {
      cy.get(".checker").last().click({ force: true });
      cy.get(".todo-item")
        .last()
        .find(".editable")
        .should(
          "have.css",
          "text-decoration",
          "line-through solid rgb(49, 46, 46)"
        );
    });
  });

  describe("item incompleted", () => {
    beforeEach(() => {
      cy.get("img").first().click();
      cy.get('input[placeholder="Add a new todo item"]').type(
        "To be incompleted",
        { force: true }
      );
      cy.get("input[type='submit']").last().click({ force: true });
      cy.get(".checker").last().click({ force: true });
    });

    it("can set an item as incompleted", () => {
      cy.get(".checker").last().click({ force: true });
      cy.get(".todo-item")
        .last()
        .find(".editable")
        .should("have.css", "text-decoration", "none solid rgb(49, 46, 46)");
    });
  });

  describe("item delete", () => {
    beforeEach(() => {
      cy.get("img").first().click();
      cy.get('input[placeholder="Add a new todo item"]').type("To be deleted", {
        force: true,
      });
      cy.get("input[type='submit']").last().click({ force: true });
    });

    it("can delete an item", () => {
      cy.contains("To be deleted")
        .parent()
        .find(".remover")
        .click({ force: true });
      cy.contains("To be deleted").should("not.exist");
    });
  });
});
