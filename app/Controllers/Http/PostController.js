'use strict'

const Post = use('App/Models/Post');

const {validateAll} = use('Validator');

class PostController {
    async store({request, response, auth}){

        const rules = {
            title: 'required',
            content: 'required'
        }


        const validate = await validateAll(request.all(), rules);

        if (validate.fails()){
          return response.status(401).send({message: validate.messages()})
        }
        
        const { id } = auth.user;

        const {title, content} = request.all();

        const post = await Post.create({title, content, user_id: id});

        return post;
    }

    async update({request, response, params}){
        const {title, content} = request.all();

        const post = await Post.find(params.id);

        if(!post){
            return response.status(404).send(err);
        }

        post.title = title;
        post.content = content;

        await post.save()

        return post;
    }

    async destroy({response, params}){
        const post = await Post.find(params.id);

        if(!post){
           return response.status(404).send({message: "Post não existe"});
        }

        await post.delete();

        return response.status(204).send();
    }

    async index({request, response}){
        const post = await Post.query().with('user').fetch();

        return post;
    }
}

module.exports = PostController
