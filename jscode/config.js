module.exports = {
    secret: process.env.JWT_SECRET,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT || 3001
};