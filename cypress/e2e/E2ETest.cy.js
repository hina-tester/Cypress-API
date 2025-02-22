describe('E2ETest API',()=>{



    it('Test using custome command',()=>{


     

        let payload = {
            "name": "AB Automation Hub",
           "email": `test${Date.now()}@gmail.com`, // Unique email to avoid duplication,
         
         
            "gender": "female",
            "status": "active"
        }

        cy.postAPI( payload).then((response) => {
            expect(response.status).to.be.equal(201);
            let userId = response.body.id;

            cy.getAPI(userId).then((response) => {
                expect(response.status).to.be.equal(200);
                let userId = response.body.id;
            })
            
            cy.putAPI(userId).then((response) => {
                expect(response.status).to.be.equal(200);
            })
        
        
        cy.deleteAPI(userId).then((response)=>{
            expect(response.status).to.be.equal(204)
        })

        
        })
       

    })

})
