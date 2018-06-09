var config = require('./config.ctrl')

/*
 * routes for Configuration Controller
 */

app.get('/config/setup', config.insterDefaultMasterData);
app.get('/config/setup/:modelName', config.insterDefaultMasterData);
