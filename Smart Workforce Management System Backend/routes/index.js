const Router = require("express").Router()
const api = require('./api/index')


Router.use("/api",api)
module.exports = Router