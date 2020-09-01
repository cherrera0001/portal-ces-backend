const debugModule = require('debug');

// Set debug namespace for our app
// https://github.com/visionmedia/debug/issues/117
exports.debugApp = debugModule('app');
exports.debugMongo = debugModule('ces-database');
exports.debugRoute = debugModule('route');
exports.debugPush = debugModule('push');
exports.debugMail = debugModule('mail');
exports.debugAccount = debugModule('account');
