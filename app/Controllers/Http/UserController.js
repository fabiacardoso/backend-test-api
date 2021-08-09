'use strict'

const User = use('App/Models/User');

class UserController {
    
    async store ({request, response}){
        const data = request.only(['displayName', 'email', 'image', 'password']);

        const user = await User.create(data);

        response.status(201).send();
        return user;
    }

    async index({request, response}){
        const users = await User.all();
        
        return users;
    }

    async login({request, response, auth}){
        try{
            const {email, password} = request.all();

            const token = await auth.attempt(email, password);

            return token;

        }catch(error){

            return response.status(400).send({error: error});

        }
    }
}

module.exports = UserController
