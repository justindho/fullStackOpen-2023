describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Test User logged in')
  })

  it('user can login', function() {
    cy.contains('log in').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('Test User logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'password' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('a blog created by cypress')
      cy.get('#author-input').type('test-author')
      cy.get('#url-input').type('http://url-input.com')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'test-title',
          author: 'test-author',
          url: 'test-url'
        })
      })
    })
  })
})