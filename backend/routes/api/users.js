const jwt = require('jsonwebtoken');
const randomip = require('random-ip');
const jwt_decode = require("jwt-decode");
const fs = require('fs');
const db = require("../../models")
const Users = db.users
const Op = db.Sequelize.Op;

module.exports = (app) => {
    //SignUp
    app.get('/api/users', (req, res) => {
        Users.findAll()
            .then(data => {
                res.send({data})
            })
            .catch(err => {
                res.status(503).send({
                    message: err.message || "Some error occurred while fetching users information from database."
                });
            });
    });
};