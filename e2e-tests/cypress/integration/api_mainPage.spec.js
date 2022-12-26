/// <reference types="Cypress" />

const faker = require('faker')

describe('Word - Post', () => {
    it('Post a request. (201 status code)', () => {
      const word = {
        wordName: faker.random.alpha(10),
        userId: 1,
        languageId:"en",
    }
    cy.request({
        method:'POST',
        url:'https://thewordsthatiknowapi-git-stage-pankwood.vercel.app/word',
        body: {
            wordName: word.wordName,
            userId: word.userId,
            languageId:word.languageId
          },
          headers: {
            authorization: 'Basic dGhld29yZHRoYXRpa25vdzp0aGV3b3JkdGhhdGlrbm93MjAw'
          },
    }).then(response => {
       expect(response.status).to.equal(201)
        })
    })
  })