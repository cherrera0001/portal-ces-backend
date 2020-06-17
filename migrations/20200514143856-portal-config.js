const cuotas = [
  { description: '12', key: '12', configType: 'term' },
  { description: '24', key: '24', configType: 'term' },
  { description: '36', key: '36', configType: 'term' },
  { description: '48', key: '48', configType: 'term' },
  { description: '60', key: '60', configType: 'term' },
];

module.exports = {
  async up(db) {
    db.collection('PortalConfig').insertMany(cuotas);
  },

  async down(db) {
    db.collection('PortalConfig').drop();
  },
};
