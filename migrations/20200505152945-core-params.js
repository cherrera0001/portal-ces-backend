const axios = require('axios');

const { CORE_URL } = process.env;

module.exports = {
  async up(db) {
    const response = await axios({
      method: 'GET',
      url: `${CORE_URL}/chl/v1/core-params`,
    });

    db.collection('CoreParams').insertMany(response.data);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
