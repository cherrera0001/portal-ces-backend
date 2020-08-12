const config = Object.freeze({
  url: process.env.LDAP_URL,
  bindDN: process.env.LDAP_USER,
  bindCredentials: process.env.LDAP_PASSWORD,
  searchBase: 'ou=Chile,dc=internal,dc=amicar,dc=com',
  searchFilter: '(|(sAMAccountName={{username}})(mail={{username}}))',
});

module.exports = config;
