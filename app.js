const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Config info
const PORT = 8081;

// All routers
const indexRouter = require('./server/routes/index');
const usersRouter = require('./server/routes/user_routes');
const permissionRouter = require('./server/routes/permission_routes');
const rolesPermissionRouter = require('./server/routes/roles_permission_routes');

// server start
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/permissions', permissionRouter);
app.use('/rolesPermissions',rolesPermissionRouter);


app.listen(PORT, () => {
    console.log("Server listening on port 8081");
});

module.exports = app;
