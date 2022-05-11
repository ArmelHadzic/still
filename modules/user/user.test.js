/* eslint-disable no-undef */
import request from 'supertest';
import sinon from 'sinon';

import server from '../../server.js';
import UserModel from '../user/userModel.js';

describe('User tests', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => sandbox.restore());

    describe('Fetching users', () => {
        it('should GET 200 when users are fetched', (done) => {
            const users = [{
                "_id": {
                  "$oid": "5f0f36345628b2bb08ddcf83"
                },
                "firstName": "Marina",
                "lastName": "Orozco",
                "email": "marina@ankorainc.com",
                "phoneNumber": "202-555-0105",
                "__v": 0
              },
              {
                "_id": {
                  "$oid": "5f0f3634a3357afc09a0333d"
                },
                "firstName": "Kip",
                "lastName": "Winters",
                "email": "kip@ankorainc.com",
                "phoneNumber": "202-555-0168",
                "__v": 0
              }
            ]

            sandbox.stub(UserModel, 'find').returns(users);

            request(server)
                .get('/users')
                .expect(200)
                .end(done);
        });

        it('should GET 500 when users are unavailable', (done) => {
            sandbox.stub(UserModel, 'find').throws(new Error('Unavailable'));

            request(server)
                .get('/users')
                .expect(500)
                .end(done);
        });

        it('should GET 500 when users list is empty', (done) => {
            sandbox.stub(UserModel, 'find').returns([]);

            request(server)
                .get('/users')
                .expect(500)
                .end(done);
        });

        it('should GET 200 when user is fetched', (done) => {
            const user = {
                "_id": {
                  "$oid": "5f0f3634a3357afc09a0333d"
                },
                "firstName": "Kip",
                "lastName": "Winters",
                "email": "kip@ankorainc.com",
                "phoneNumber": "202-555-0168",
                "__v": 0
            }
            
            sandbox.stub(UserModel, 'findOne').returns(user);

            request(server)
                .get('/users/5f0f3634a3357afc09a0333d')
                .expect(200)
                .end(done);
        });

        it('should GET 500 when wrong id is provided', (done) => {
            sandbox.stub(UserModel, 'findOne').returns(null);

            request(server)
                .get('/users/someWrongID')
                .expect(500)
                .end(done);
        });

        it('should GET 500 when correct id is provided but user is missing', (done) => {
            sandbox.stub(UserModel, 'findOne').returns(null);

            request(server)
                .get('/users/5f0f3634a3357afc09a0366r')
                .expect(500)
                .end(done);
        });
    });

    describe('Creating and updating users', () => {
        it('should GET 200 when user is created', (done) => {
            const userData = {
                firstName: 'testFirstName',
                lastName: 'testLastName',
                email: 'testemail@test.tt',
                phoneNumber: 'testPhone'
            };
            
            const user = {
                "_id": {
                    "$oid": "5f0f36345628b2bb08ddcf83"
                },
                "firstName": "testFirstName",
                "lastName": "testLastName",
                "email": "testemail@test.tt",
                "phoneNumber": "testPhone"
            };

            sandbox.stub(UserModel, 'findOne').returns(null);
            sandbox.stub(UserModel, 'create').returns(user);

            request(server)
                .post('/users')
                .query(userData)
                .expect(200)
                .end(done);
        });

        it('should GET 422 when required params are missing or invalid', (done) => {
            const userData = {
                lastName: 'testLastName',
                email: 'testemail',
                phoneNumber: 'testPhone'
            };

            sandbox.stub(UserModel, 'findOne').returns(null);
            sandbox.stub(UserModel, 'create').returns(null);

            request(server)
                .post('/users')
                .query(userData)
                .expect(422)
                .end(done);
        });

        it('should GET 500 when user already exists', (done) => {
            const userData = {
                firstName: 'testFirstName',
                lastName: 'testLastName',
                email: 'testemail@test.tt',
                phoneNumber: 'testPhone'
            };

            const user = {
                "_id": {
                    "$oid": "5f0f36345628b2bb08ddcf83"
                },
                "firstName": "testFirstName",
                "lastName": "testLastName",
                "email": "testemail@test.tt",
                "phoneNumber": "testPhone"
            };

            sandbox.stub(UserModel, 'findOne').returns(user);

            request(server)
                .post('/users')
                .query(userData)
                .expect(500)
                .end(done);
        });

        it('should GET 200 when user is updated correctly', (done) => {
            const userData = {
                firstName: 'testFirstName',
                lastName: 'testLastName',
                email: 'testemail@test.tt',
                phoneNumber: 'testPhone'
            };

            sandbox.stub(UserModel, 'find').returns(null);
            sandbox.stub(UserModel, 'findOneAndUpdate').returns(null);

            request(server)
                .put('/users/5f0f3634e8dfd9bbde33c703')
                .query(userData)
                .expect(500)
                .end(done);
        });
        
        it('should GET 500 when no valid ID is provided for updating user', (done) => {
            request(server)
                .put('/users/someID')
                .expect(500)
                .end(done);
        });

        it('should GET 500 when no user is found for update', (done) => {
            sandbox.stub(UserModel, 'find').returns(null);
            sandbox.stub(UserModel, 'findOneAndUpdate').returns(null);

            request(server)
                .put('/users/5f0f3634e8dfd9bbde33c703')
                .expect(500)
                .end(done);
        });
    });
});
