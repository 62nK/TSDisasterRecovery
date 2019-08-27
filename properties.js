const ADMIN = 2189371;
const USER = 8965142;

module.exports.ADMIN = ADMIN;
module.exports.USER = USER;

module.exports.database = {
    url: "mongodb://localhost:27017/disaster-recovery-db",
    username: "",
    password: ""
}

module.exports.defaultAdmin = {
    username: "admin",
    password: "1234",
    role: ADMIN
}
module.exports.defaultUser = {
    username: "user",
    password: "1234",
    role: USER
}

module.exports.port = process.env.PORT || 3001;

module.exports.encryption = {
    privateKey: '*&%^A*&G@N',
    saltRounds: 6
}