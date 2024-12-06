import Quiz from '../../client/src/components/Quiz';

describe('Quiz component', () => {
    // Mount the Quiz component before each test
    beforeEach(() => cy.mount(<Quiz />));

    it('renders the "Start Quiz" button with correct properties', () => {
        // Check if the "Start Quiz" button is visible, has the correct text, and applies the correct class
        cy.get('.btn')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Start Quiz')
            .and('have.class', 'btn-primary');
    });

    it('toggles from "Start Quiz" button to quiz content on click', () => {
        // Simulate a click on the "Start Quiz" button and check if the quiz content is displayed
        cy.get('.btn').click();

        // Ensure the quiz content is visible after clicking the button
        cy.get('.quiz-content').should('be.visible');

        // Verify the "Start Quiz" button is no longer displayed
        cy.get('.btn').should('not.exist');
    });
});
