const config = {
  url: process.env.LDAP_URL,
  bindDN: String.raw`${process.env.LDAP_USER}`,
  bindCredentials: process.env.LDAP_PASSWORD,
  searchBase: 'ou=Chile,dc=internal,dc=amicar,dc=com',
  searchFilter: '(|(sAMAccountName={{username}})(mail={{username}})(description={{username}}))',
};

module.exports = config;
