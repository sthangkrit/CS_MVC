var sql = require("mssql");
// var moment = require('moment')
const fs = require('fs')

const data = require('../db')


class request {

    login(req) {

        try {


            var id = req.id
            var pass = req.password

            var acount = data.find(data => data.id === id)

            if (acount.password != pass) {
                let message = {
                    statusCode: 400,
                    message: "Wrong password"
                }
                return (message)
            }

            var index = data.findIndex(data => data.id === id)

            console.log(index)

            var update = data[index].checkIn = true
            var jsonString = JSON.stringify(data)

            fs.writeFile('./db.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })

            let message = {
                statusCode: 200,
                message: "Login Success",
                data: acount
            }


            return (message)


        } catch (err) {
            console.log(err)
            let message = {
                statusCode: 400,
                message: "Id is not exist"
            }
            return message
        }


    }

    count() {

        var count = 0

        try {

            for (var i = 0; i < data.length; i++) {
                if (data[i].checkIn) {
                    console.log(data[i].checkIn)
                    count += 1
                }
            }

            return (count)


        } catch (e) {
            let message = {
                statusCode: 400,
                message: e
            }
            return message
        }
    }


}

module.exports = request