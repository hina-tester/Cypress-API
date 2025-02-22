// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getAPI', (pathParam) => {

    cy.request({
        method: 'GET',
        url: '/' + pathParam,
        headers: {

            Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
               }
    })


})


Cypress.Commands.add('postAPI', (payload) => {

    cy.request({
        method: 'POST',
        url: '/',
        headers: {

            Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
           
        },
        body: payload

    })
})

Cypress.Commands.add('putAPI', (pathParam) => {

    cy.request({
        method: 'PUT',
        url: '/' + pathParam,
        headers: {

            Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
        },
       
    })

})


Cypress.Commands.add('deleteAPI', (pathParam) => {
    cy.request({
        method: 'DELETE',
        url: '/'+ pathParam,
        headers: {

            Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
        },

        failOnStatusCode: false
    })
})