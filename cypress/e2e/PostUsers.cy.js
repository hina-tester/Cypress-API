import payload from '../Config/Payload.json'

describe('Post', ()=>{

    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 10)
        const email = randomString + "@dispostable.com"
        return email
    }



   it('PostRequest-JSON', ()=>{


    let payload ={

        name: "AB Test 01",
        email: `test${Date.now()}@gmail.com`, // Unique email to avoid duplication
        gender: "female",
        status: "active"

    }

    

    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v2/users',
        headers:{
            
            Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
              
            },
            body: payload
    })

    .then((response)=>{
      

        expect(response.status).to.equal(201)
        expect(response.body).has.property("name", "AB Test 01")
        expect(response.body).has.property("gender", "female")
        expect(response.body).has.property("status", "active")
        expect(response.body.id).to.not.be.null
    })


    })




    it('PostRequest-fixture', ()=>{

        cy.fixture('Users').then((responseObject) => {

            responseObject.email = generateRandomEmail()
            
            
    
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers:{
                
                Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
                  
                },
                body: responseObject
        })
    
        .then((response)=>{
          
    
            expect(response.status).to.equal(201)
            expect(response.body).has.property("name", "Bhargavi Deshpande")
            expect(response.body).has.property("gender", "male")
            expect(response.body).has.property("status", "active")
            expect(response.body.id).to.not.be.null
        })
    

        })
    
            })
    
            it('PostRequest- config json', ()=>{

                payload.email = generateRandomEmail()
 
            
                cy.request({
                    method: 'POST',
                    url: 'https://gorest.co.in/public/v2/users',
                    headers:{
                        
                        Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
                          
                        },
                        body: payload
                })
            
                .then((response)=>{
                  
            
                    expect(response.status).to.equal(201)
                    expect(response.body).has.property("name", "Bhargavi Deshpande")
                    expect(response.body).has.property("gender", "male")
                    expect(response.body).has.property("status", "active")
                    expect(response.body.id).to.not.be.null


                    let id=response.body.id

                    cy.request({
                        method: 'GET',
                        url: 'https://gorest.co.in/public/v2/users/' + id ,
                        headers:{
                            
                            Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
                              
                            },
                            
                    })

                    .then((response)=>{


                        expect(response.status).to.be.equal(200)
                        expect(response.body).has.property("name", "Bhargavi Deshpande")
                        expect(response.body).has.property("gender", "male")
                        expect(response.body).has.property("status", "active")
                    })
                })
            
            
                })
            
                it('PostRequest- nagative token json', ()=>{
             
                
                    cy.request({
                        method: 'POST',
                        url: 'https://gorest.co.in/public/v2/users',
                        headers:{
                            
                            Authorization: 'Bearer '
                              
                            },
                            failOnStatusCode: false,
                            body: payload
                    })
                
                    .then((response)=>{
                      
                
                        expect(response.status).to.equal(401)
                           
         
                
                    })
      
                })


        
            it('PostRequest- null email', ()=>{

                    payload.email = null
     
                
                    cy.request({
                        method: 'POST',
                        url: 'https://gorest.co.in/public/v2/users',
                        headers:{
                            
                            Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
                              
                            },
                            failOnStatusCode: false,
                            body: payload
                    })
                
                    .then((response)=>{
                      
                
                        expect(response.status).to.equal(422)
                        expect(response.body).to.be.an('array'); // Ensure response body is an array
                        expect(response.body[0]).to.have.property("field", "email"); // Validate field name
                        expect(response.body[0]).to.have.property("message", "can't be blank"); // Validate message
                   //     expect(response.body.message).to.equal("can't be blank");
                    
                      
                    })
            })

            it.only(' POST CALL - Negative Case || Duplicate Email', ()=>{

               // payload.email = null
               payload.email = "test@gmail.com"
 
            
                cy.request({
                    method: 'POST',
                    url: 'https://gorest.co.in/public/v2/users',
                    headers:{
                        
                        Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
                          
                        },
                        failOnStatusCode: false,
                        body: payload
                })

            
                .then((response)=>{
                  
            
                    expect(response.status).to.equal(422)
                    expect(response.body).to.be.an('array'); // Ensure response body is an array
                    expect(response.body[0]).to.have.property("field", "email"); // Validate field name
                    expect(response.body[0]).to.have.property("message", "has already been taken"); // Validate message
               //     expect(response.body.message).to.equal("can't be blank");
                
                  
                })
        })
})