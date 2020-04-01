import debugModule from 'debug';

// Set debug namespace for our app
// https://github.com/visionmedia/debug/issues/117
export const debugApp = debugModule('app');
export const debugMongo = debugModule('mongo');
export const debugRoute = debugModule('route');
export const debugPush = debugModule('push');
export const debugMail = debugModule('mail');
export const debugAccount = debugModule('account');
