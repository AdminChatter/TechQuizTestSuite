/// <reference types="cypress" />

// Extend Cypress commands for custom quiz interactions
declare namespace Cypress {
    interface Chainable<Subject = any> {
      startQuiz(): Chainable<Subject>;
      selectRandomAnswer(): Chainable<Subject>;
      completeQuizWithRandomAnswers(numQuestions: number): Chainable<Subject>;
      restartQuiz(): Chainable<Subject>;
    }
  }
  
  describe('Quiz User Interaction', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:3001/');
    });
  
    it('Displays Quiz Page Before Start', () => {
      cy.get('.p-4.text-center').should('exist');
      cy.get('button').should('exist').and('have.text', 'Start Quiz');
    });
  
    it('Starts Quiz and Shows First Question', () => {
      cy.startQuiz();
    });
  
    it('Completes Quiz by Selecting Random Answers', () => {
      cy.startQuiz();
      cy.completeQuizWithRandomAnswers(10); // Adjust based on total questions
      cy.get('h2').contains('Quiz Completed');
    });
  
    it('Restarts the Quiz After Completion', () => {
      cy.startQuiz();
      cy.completeQuizWithRandomAnswers(10);
      cy.get('h2').contains('Quiz Completed');
      cy.restartQuiz();
      cy.get('button').should('have.text', 'Take New Quiz');
    });
  });
  
  // Custom command to start the quiz
  Cypress.Commands.add('startQuiz', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.get('h2').should('be.visible'); // Verify the question header is visible
  });
  
  // Custom command to select a random answer
  Cypress.Commands.add('selectRandomAnswer', () => {
    cy.get('button', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .then(($buttons) => {
        const randomIndex = Math.floor(Math.random() * $buttons.length);
        cy.wrap($buttons[randomIndex]).click();
      });
  });
  
  // Custom command to complete the quiz by selecting random answers
  Cypress.Commands.add('completeQuizWithRandomAnswers', (numQuestions) => {
    Cypress._.times(numQuestions, () => cy.selectRandomAnswer());
  });
  
  // Custom command to restart the quiz
  Cypress.Commands.add('restartQuiz', () => {
    cy.get('button').contains('Take New Quiz', { timeout: 10000 }).click();
    cy.get('button').should('have.text', 'Take New Quiz');
  });
  