var sql = require("mssql");
// var moment = require('moment')

// config for your database
var config = {
    user: 'sa',
    password: 'P@d0rU123',
    server: '167.71.200.91',
    database: 'sthangDB'
};

// connect to your database
var errdb = sql.connect(config)
if (errdb) {
    console.log(errdb);
}

class request {

    async Deposit(req) {
        let functionName = '[Deposit]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {

                var request = new sql.Request();
                var acount = req.acount
                // console.log(acount)
                var acount_id = req.acount_id
                var deposit = req.deposit
                var statusCode = 0;
                var massage = ""
                var check = `SELECT acount, acount_id
FROM sthangDB.dbo.BankAcount WHERE acount = '${acount}' AND acount_id ='${acount_id}'; `
                var result = await request.query(check);
                // console.log(result.recordset[0])
                if ((result.recordset[0]) == undefined) {
                    statusCode = 400
                    massage = "Deposit Fail : acount or acount_id is incorect"
                } else {
                    if (deposit >= 100) {

                        var command = `UPDATE sthangDB.dbo.BankAcount
                SET balance+= '${deposit}' WHERE acount = '${acount}' AND acount_id =  '${acount_id}';`
                        await request.query(command); //ยิง command เข้าไปใน
                        statusCode = 200
                        massage = "Deposit Success : Your Deposit " + deposit + " to Wallet"

                    } else {
                        statusCode = 400
                        massage = "Deposit Fail : Minimum Deposit is 100 Bath"
                    }
                }


                let message = {
                    statusCode: statusCode,
                    message: massage
                }

                resolve(message)
            } catch (err) {
                let messageError = {
                    statusCode: err.statusCode || 400,
                    message: err.message || `${functionName} CREATE failed [Error] ${err}`
                }
                reject(messageError)
            }


        })
    }





}

module.exports = request