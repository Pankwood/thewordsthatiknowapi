/// <reference types="Cypress" />

const faker = require('faker')
describe('Word - Post', () => {
    it.only('Post a request. (201 status code)', () => {
      const word = {
        wordName: faker.random.alpha(10),
        userId: 1,
        languageId:"en",
    }
    cy.request({
        method:'POST',
        url:'https://thewordsthatiknowapi-git-stage-pankwood.vercel.app/word',
        body: {
            name: word.wordName,
            description: word.userId,
            languageId:word.languageId
          }
    }).then(response => {
       expect(response.status).to.equal(201)
       //expect(response.body.name).to.equal(project.name)
       //expect(response.body.description).to.equal(project.description)
        })
    })
  })