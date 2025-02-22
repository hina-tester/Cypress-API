import UpdateUsers from '../Config/UsersUpdate.json'
import  users from '../Config/Payload.json'

describe('Put Call in Cypress', ()=>{

    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 10)
        const email = randomString + "@dispostable.com"
        return email
    }

    it('Put Call using JSON', ()=>{

        cy.request({
        
            method: 'PUT',
            url: 'https://gorest.co.in/public/v2/users/7697146',
            headers: {

                    Authorization : 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
                },
                body:{

                        "name":"test 123",
                        "email":"tes44@gmail.com"
                     
                }
        })
        .then((response)=>{

         expect(response.status).to.equal(200)
         expect(response.body).has.property("name", "test 123")
         expect(response.body).has.property("email", "tes44@gmail.com")
        })

    })

    it('Put Call using JSON fixture', ()=>{

        cy.fixture('PayloadPutUsers').then((payload)=>{

            cy.request({
        
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/users/7697146',
                headers: {
    
                        Authorization : 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
                    },
                    body: payload
            })
            .then((response)=>{

                expect(response.status).to.equal(200)
                expect(response.body).has.property("name", "qa testing world")
               
               })

        })
    })

    it('PUT CALL - Confif/JSON', () => {
        cy.request({
            method: 'PUT',
            url: 'https://gorest.co.in/public/v2/users/7697146',
            headers: {

                Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
            },
            body: UpdateUsers
        }).then((response) => {

            expect(response.status).to.be.equal(200)
            expect(response.body).has.property("name", "testing ab")
        })

    })


    it(' End to End Flow', () => {
        users.email = generateRandomEmail()
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
            },
            body: users
        }).then((response) => {
            let id = response.body.id
            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {

                    Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
                },
                body: UpdateUsers
            })
            .then((response)=>{
                expect(response.status).to.be.equal(200)
            })
            cy.request({
                method:'GET',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {

                    Authorization: 'Bearer 60fef5618dc29400390eadee15e2094b89e8fb31ac5a28beae5cd22c56a01b0f'
                },
            })
            .then((response)=>{
                expect(response.status).to.be.equal(200)
                expect(response.body).has.property('name', UpdateUsers.name)
            })

        })


    })


        })
  
