import "./commands"; // Import custom Cypress commands
import { mount } from "cypress/react18"; // Import the mount function for React components

// Extend Cypress with the custom `mount` command
declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount; // Add `mount` to Cypress' chainable interface
        }
    }
}

// Add the `mount` command to Cypress
Cypress.Commands.add("mount", mount);
