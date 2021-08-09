'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Quando meu aleluia cessou nova canção me destes!' }
})

Route.post('/post', 'PostController.store').middleware('auth');;
Route.get('/post', 'PostController.index');
Route.put('/post/:id', 'PostController.update');
Route.delete('/post/:id', 'PostController.destroy');

Route.post('/user', 'UserController.store');
Route.post('/login', 'UserController.login');
Route.get('/user', 'UserController.index').middleware('auth');