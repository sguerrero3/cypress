describe('Testing basic Overleaf functionality', () => {

    beforeEach(()=>{
        cy.visit('https://www.overleaf.com/login')
        cy.wait(5000)
    })
    it('Test link between login and resistration page',() => {
        cy.get('a[href="/register"]').click()
        cy.url().should('eq', 'https://www.overleaf.com/register')
        cy.get('a[href="/login"]').click()
        cy.url().should('eq', 'https://www.overleaf.com/login')
    })
    it('Test register error', () => {
        cy.get('a[href="/register"]').click()

        cy.get('form.login-register-form-focus').within(()=>{
            cy.get('input#email').type('Esto no es un email')
            cy.get('input#passwordField').type('123456789')
        })

        cy.wait(1000)

        cy.get('div[class="small text-danger mt-2"]').should('be.visible')
    })
    it('Test register good', () => {
        cy.get('a[href="/register"]').click()

        cy.get('form.login-register-form-focus').within(()=>{
            cy.get('input#email').type('pruebaemail@gmail.com')
            cy.get('input#passwordField').type('123456789rR!')
            cy.get('button[class="btn-primary btn btn-block"]').click()
        })

        cy.url().should('eq', 'https://www.overleaf.com/registration/confirm-email')

    })
    it('Test login good', ()=>{

        cy.get('form.login-register-form-focus').within(()=>{
            cy.get('input#email').type('ferefej199@felibg.com')
            cy.get('input#password').type('pruebaWeb123')
            cy.get('button[class="btn-primary btn btn-block"]').click()
        })

        cy.url().should('eq', 'https://www.overleaf.com/project')
    })
    it('Test login error', ()=>{

        cy.get('form.login-register-form-focus').within(()=>{
            cy.get('input#email').type('ferefej199@felibg.com')
            cy.get('input#password').type('estanoes')
            cy.get('button[class="btn-primary btn btn-block"]').click()
        })

        cy.wait(1000)

        cy.get('div[class="alert mb-2 alert-danger"]').should('be.visible')
    })
    it('Test forgot password link', ()=>{

        cy.contains('Forgot your password?').click();

        cy.url().should('eq', 'https://www.overleaf.com/user/password/reset')

    })
    it('Test documentation info', () => {
        cy.visit('https://www.overleaf.com/')
        cy.get('a[href="/learn/latex/Learn_LaTeX_in_30_minutes"]').click()
        
        cy.url().should('eq', 'https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes')
    })
    it('Test about us info', ()=>{
        cy.visit('https://www.overleaf.com/')
        cy.get('a[href="/about"]').click()
        
        cy.url().should('eq', 'https://www.overleaf.com/about')
    })
})