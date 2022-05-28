const admCreds = {usr:'admin',pass:'root'}
const usrCreds = {usr:'Mario',pass:'123'}

describe('Funcionalidad de la página de Login', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })

    it('El usuario puede iniciar sesión como admin',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()

        cy.get('Button:contains("Create User")').should('exist')
    })

    it('El usuario puede iniciar sesión normal sin privilegios',()=>{
        cy.get('input[name="usuario"]').type(usrCreds.usr)
        cy.get('input[name="contra"]').type(usrCreds.pass)
        cy.get('button[name="submit-btn"]').click()

        cy.get('Button:contains("Create User")').should('not.exist')
    })

    it('El usuario no puede iniciar sesión si ponen mal las credenciales',()=>{
        cy.get('input[name="usuario"]').type(usrCreds.usr+'fail')
        cy.get('input[name="contra"]').type(usrCreds.pass+'fail')
        cy.get('button[name="submit-btn"]').click()

        cy.get('.error').contains('Los datos ingresados son incorrectos')
    })
    it('El usuario no puede iniciar sesión si se dejan espacios vacios',()=>{
        cy.get('button[name="submit-btn"]').click()

        cy.get('.error').contains('Los datos ingresados son incorrectos')
    })
})