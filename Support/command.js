Cypress.Commands.add('Org_login', () => {
    cy.request({
           method: 'POST',
           url: 'https://api-test.app/auth/signin', // baseUrl is prepend to URL
           form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
           body: {
             username: 'test',
             password: 'Dell8150',
             type: 'admin',
            subdomainURL: "microsoft"
           },
         }).then((resp)=>{
           //cy.log(resp.body.result.username)
          cy.writeFile('cypress/fixtures/token.txt',resp.body.token)

           //window.localStorage.setItem('twk_token_6465f57bad80445890eda866', resp.body.token)
           cy.visit('https://microsoft.-test.app/apps/planning/resources?mydata=U2FboxUNDI8JocppITYSsWjGEbKZsSeGixEt5eglx%2FEikToNuVJoaDL6ETCK2B8GJ7w03Lz0OR5GSb5CoirAleCKvmU%2BAB%2FcCGRzGbEhwaQ%2FMrBZu18A4yut97wtke%2FdYjzKdsuKzReGEek7x0I1bu2x8tASb42LsyHuqxcv5Y6LSu8pVyvXLaX%2BtTOq71cStG9Xg5Y8eBidp2icvVIsmljE2ZdQ7kTE90hn%2BHLEx8VuDJtDUPbIgNFrLkviiBuDD7x7qcenJzXXFuyu6VIM7skp9DKZhpQSUSdAAhcODIFU67F83DmyhZtl2duimfUJ3hyIVurNjtLOqHHRGm9HznyaUwPOuuS8MraSQiFl2ewyKpT1pCJEf%2BcuXh760KEEVPH62gRWZQI9J8np2uA%2B5%2BFcafLXY2nmjn%2BjUfDcMAivV%2Fvi03VKykg0DuEttYlz8gNrQ93qVlJ6l9daKUiUVg8mH4xtPqQmimzJ%2Bqs6A9SKGbL5P83KGvSjHVt2X9QYShdbw3dIfCLH488pcfTNN1imxxLsuijsYZF0aU8NVzDeTg9dkZG5uFGfI%2FxVSyWzpxPj8HR4mkix47YCRvyjstHr0NSkwCvjEYUGIfwqIw%3D&user=[object%20Object]&key=76ac9c29f8c3fd78f56492a7b9f99', {
               onBeforeLoad(win) {
                 win.localStorage.setItem('twk_token_6465f57bad80445810eda866', resp.body.token)
               },
             })
             cy.wait(2000)
         })
})