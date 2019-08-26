module.exports.database = {
    url: "mongodb://localhost:27017/disaster-recovery-db",
    username: "",
    password: ""
}

module.exports.port = process.env.PORT || 3001;

module.exports.encryption = {
    privateKey : '*&%^A*&G@N'
}