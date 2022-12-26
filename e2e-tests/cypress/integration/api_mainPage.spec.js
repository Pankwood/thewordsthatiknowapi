/// <reference types="Cypress" />

const faker = require('faker')
describe('Word - Get', () => {
  it('Get a word request', () => {
  cy.request({
      method:'GET',
      url:'https://thewordsthatiknowapi-git-stage-pankwood.vercel.app/word',

  }).then(response => {
     expect(response.status).to.equal(200)
     expect(response.body[0]).to.have.property('wordName')
      })
  })
})

it.only('Get a word request by word and language', () => {
  cy.request({
      method:'GET',
      url:'https://thewordsthatiknowapi-git-stage-pankwood.vercel.app/word/Stage/language/en',

  }).then(response => {
     expect(response.status).to.equal(200)
     })
  })
describe('Word - Post', () => {
    it('Post a word request', () => {
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