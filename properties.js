module.exports.database = {
    url: "mongodb://localhost:27017/disaster-recovery-db",
    username: "",
    password: ""
}

module.exports.defaultAdmin = {
    username : "admin",
    password : "1234",
    role : 0 // 0=ADMIN
}
module.exports.defaultUser = {
    username : "user",
    password : "1234",
    role : 1 // 1=REGULAR_USER
}

module.exports.port = process.env.PORT || 3001;

module.exports.encryption = {
    privateKey : '*&%^A*&G@N',
    saltRounds: 6
}