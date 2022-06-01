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

    //falta hacer este, no se si lo implemente bien
    it('No se puede dejar el nombre de un producto vacio',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-opts > :nth-child(1)').click()
        cy.get('#entry-items > button').click()
        cy.get('#entry-items > :nth-child(9)').should('not.exist')
      
    })

    it('No se pued poner como 0 o menor el precio',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-opts > :nth-child(1)').click()
        cy.get('[type="text"]').type('Productox')
        cy.get('[name="precio"]').clear()
        cy.get('[name="precio"]').type('0')
        cy.get('[name="cantidad"]').clear()
        cy.get('[name="cantidad"]').type('123')
        cy.get('#entry-items > button').click()
        cy.get('.error').contains('Campos inválidos')
      
    })
    it('No se pued poner como 0 o menor la cantidad',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-opts > :nth-child(1)').click()
        cy.get('[type="text"]').type('Productox')
        cy.get('[name="precio"]').clear()
        cy.get('[name="precio"]').type('123')
        cy.get('[name="cantidad"]').clear()
        cy.get('[name="cantidad"]').type('0')
        cy.get('#entry-items > button').click()
        cy.get('.error').contains('Campos inválidos')
      
    })


    it('Se agrega un producto nuevo',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-opts > :nth-child(1)').click()
        cy.get('[type="text"]').type('Productox')
        cy.get('[name="precio"]').clear()
        cy.get('[name="precio"]').type('123')
        cy.get('[name="cantidad"]').clear()
        cy.get('[name="cantidad"]').type('4')
        cy.get('#entry-items > button').click()
        cy.get('#entry-items > :nth-child(9)').should('exist')
    
      
    })

    it('Se agrega un nuevo usuario',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-holder > :nth-child(2)').click()
        cy.get('[type="text"]').type('test')
        cy.get('[name="contra"]').type('a')
        cy.get('[name="cantidad"]').type('a')
        cy.get('.create-form > button').click()
        cy.get('p').should('exist')
       
      
    })
//No se si lo implemente bien
    it('No agrega un nuevo usuario',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-holder > :nth-child(2)').click()
        cy.get('[name="contra"]').type('a')
        cy.get('[name="cantidad"]').type('a')
        cy.get('.create-form > button').click()
        cy.get('p').should('not.exist')
        
      
    })

    it('Las contraseñas no coinciden',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-holder > :nth-child(2)').click()
        cy.get('[type="text"]').type('test')
        cy.get('[name="contra"]').type('a')
        cy.get('[name="cantidad"]').type('f')
        cy.get('.create-form > button').click()
        cy.get('.error').contains("Las contraseñas no coinciden")
        
      
    })

    it('Se agregan productos de mas a una "salida"',()=>{
        
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-opts > :nth-child(2)').click()
        
        
    })

    it('Se realiza una busqueda invalida',()=>{

        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-opts > :nth-child(2)').click()
        //Espacio vacio
        cy.get('[type="text"]').type('         ')
    })
})

describe('Funcionalidad de la página de Inventario', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:3000/inventory')
    })

    it('Inventario - Se intenta restar stock del producto',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-opts > :nth-child(3)').click()

        //cy.get('td[class="inv-col"]').type(admCreds.usr)
        //cy.get('td[class="inv-col"]  > :nth-child(1)').click()

        cy.get('tbody[id="inv-tbody"]  > :nth-child(2)').click()
        //cy.get('tr[class="inv-row"]  > :nth-child(1)').click()



        //cy.get('Button:contains("Create User")').should('exist')
    })

    
    it('Inventario - Se realiza una búsqueda de un producto Existente',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-opts > :nth-child(3)').click()
        cy.get('input[placeholder="Buscar"]').type("Donas")

        cy.get('td[class="inv-col"]').should('exist')
    })

    it('Inventario - Se realiza una búsqueda de un producto Inexistente',()=>{
        cy.get('input[name="usuario"]').type(admCreds.usr)
        cy.get('input[name="contra"]').type(admCreds.pass)
        cy.get('button[name="submit-btn"]').click()
        cy.get('#dash-opts > :nth-child(3)').click()
        cy.get('input[placeholder="Buscar"]').type("Videojuegos")

        cy.get('td[class="inv-col"]').should('not.exist')
    })

})