/*
 * Routes for post 
 */
var products = require('./products.ctrl')
var reviews = require('./reviews.ctrl')

app.post('/product', products.addProduct);
app.get('/product/:id', products.getProduct);
app.get('/product', products.getAllProduct);
app.put('/product/:id', products.editProduct);
app.delete('/product/:id', products.deleteProduct);

/*
 * Routes for Reviews
 */
app.post('/review/:id', reviews.addReview);
app.put('/review/:productId/:id', reviews.updateReview);
app.delete('/review/:productId/:id', reviews.deleteReview);
