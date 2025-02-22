describe('API Automation using Cypress', ()=>{

it('GetUsers', ()=>{
    
    cy.request({
        
        method:'GET',
             url:'https://gorest.co.in/public/v2/users',
              Headers:{
                Authorization : "Bearer 6df191f21ade955033a565d5366a6dbb4a70dae0d791f6629eb831212fdea6a6"

            }
    })

    .then((response)=>{

        cy.log(JSON.stringify(response));
        

        expect(response.status).to.equal(200)
    })
    
})



it('GetSingleUser', ()=>{
    
    cy.request({
        
        method:'GET',
             url:'https://gorest.co.in/public/v2/users/7686050',
              Headers:{
                Authorization : "Bearer 6df191f21ade955033a565d5366a6dbb4a70dae0d791f6629eb831212fdea6a6"

            }
    })

    .then((response)=>{

        cy.log(JSON.stringify(response));
        

        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(7686050);
    })
    
})

it('GetInvalidPath', ()=>{
    
    cy.request({
        
        method:'GET',
             url:'https://gorest.co.in/public/v2/user',
              Headers:{
                Authorization : "Bearer 6df191f21ade955033a565d5366a6dbb4a70dae0d791f6629eb831212fdea6a6"

            },
            failOnStatusCode: false
    })

    .then((response)=>{

        cy.log(JSON.stringify(response));
        

        expect(response.status).to.equal(404);
       
    })
    
})


it.only('GetInvalidUserID', ()=>{
    
    cy.request({
        
        method:'GET',
             url:'https://gorest.co.in/public/v2/users/123',
              Headers:{
                Authorization : "Bearer 6df191f21ade955033a565d5366a6dbb4a70dae0d791f6629eb831212fdea6a6"

            },
            failOnStatusCode: false //have to add for fail tc in api
    })

    .then((response)=>{

        cy.log(JSON.stringify(response));
        

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal("Resource not found");
       
    })
    
})


})