const { Pokemon, conn , Tipo } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators Pokemon', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name'))) 
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
  });

  describe('Validators Tipo', () => {
    beforeEach(() => Tipo.sync({ force: true }));
    describe('name', () => {
      it('should continue if name is null', (done) => {
        Tipo.create({})
          .then(() => done())
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Tipo.create({ name: 'grass' });
      });
    });
  });
});
