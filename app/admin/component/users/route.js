/*
 * Routes for post 
 */
var users = require('./users.ctrl')

app.post('/user', users.addUsers);
app.post('/login', users.login);
app.get('/user/:id', users.getUsers);
app.get('/user', users.getAllUsers);
app.put('/user/:id', users.editUsers);
app.delete('/user/:id', users.deleteUsers);

