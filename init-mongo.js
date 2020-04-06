db = db.getSiblingDB('amicar_development');

db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_development' }],
});

db = db.getSiblingDB('amicar_test');

db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_test' }],
});
