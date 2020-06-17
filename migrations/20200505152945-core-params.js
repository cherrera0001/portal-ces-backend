module.exports = {
  async up(db) {
    db.createCollection('CoreParams');
  },

  async down(db) {
    db.collection('CoreParams').drop();
  },
};
