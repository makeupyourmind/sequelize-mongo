const usersRouter = require('./users');
const companiesRouter = require('./companies');
const groupsRouter = require('./groups');

module.exports = function(app){

    app.use('/users', usersRouter);
    app.use('/companies', companiesRouter);
    app.use('/groups', groupsRouter);

}
