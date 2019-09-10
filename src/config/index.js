module.exports = {
    api: {
        port: process.env.PORT || 4000
    },
    db: {
        url: process.env.DB_URL || 'mongodb://localhost/premierLeague'
    },
    BCRYPT_HASH_ROUNDS: 10
}