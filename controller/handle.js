var sql = require("mssql");

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

    async Login(req) {
        let functionName = '[Login]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {
                var request = new sql.Request();
                var id = req.id
                var password = req.password


                const chars = id.split('@');

                if ('@' + chars[1] != '@cskmitl.ac.th') reject( functionName+ ' Fail : รูปแบบ Email ไม่ถูกต้อง')

                id = chars[0]

                var check = `SELECT SID, Password, Firstname, Lastname, Status
FROM sthangDB.dbo.STUDENTS WHERE SID='${id}' AND Password = '${password}';`
                var result = await request.query(check);


                if (result.recordset[0] == null) reject(functionName+ ' Fail : Id หรือ Password ไม่ถูกต้อง')
                if (result.recordset[0].Status == 1) reject(functionName+ ' Fail : คุณอยู่ในระบบอยู่แล้ว')

                var LoginSuccess = ` UPDATE sthangDB.dbo.STUDENTS
                SET Status = 'true' WHERE SID='${id}' AND Password = '${password}'; `
                await request.query(LoginSuccess);

                // console.log(result.recordset)
                resolve(functionName+ ' Success : เข้าสู่ระบบสำเร็จ')
            } catch (err) {

                reject(functionName+ ' Fail :  ' +err)
            }


        })
    }


    async Report() {
        let functionName = '[Report]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {
                var request = new sql.Request()

                var count_login = `SELECT COUNT(*) AS count_login
FROM sthangDB.dbo.STUDENTS WHERE Status = 'true';`
                var result_login = await request.query(count_login);

                var count_NonLogin = `SELECT COUNT(*) AS count_nonlogin
FROM sthangDB.dbo.STUDENTS WHERE Status = 'false';`
                var result_NonLogin = await request.query(count_NonLogin);

                var name_NonLogin = `SELECT Firstname,Lastname
FROM sthangDB.dbo.STUDENTS WHERE Status = 'false';`
                var result_NameNonLogin = await request.query(name_NonLogin);


                var report = {
                    "จำนวนผู้เข้าสู่ระบบ": result_login.recordset[0].count_login + ' คน',
                    "จำนวนผู้ที่ไม่เช้าสู่ระบบ": result_NonLogin.recordset[0].count_nonlogin + ' คน',
                    "รายชื่อผู้ที่ไม่เข้าสู่ระบบ": result_NameNonLogin.recordset
                }

                resolve(report)
            } catch (err) {

                reject(functionName+ ' Fail :  ' +err)
            }


        })
    }


}

module.exports = request