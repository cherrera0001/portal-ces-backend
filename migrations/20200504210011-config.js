module.exports = {
  async up(db) {
    const seedConfig = {
      allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
      maxFileSizeInKB: 40000000,
    };
    db.collection('config').insertMany([seedConfig]);
  },

  async down(db) {},
};
