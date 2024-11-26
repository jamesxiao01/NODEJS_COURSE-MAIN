
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 123456,
    database: 'test_data',
    authPlugins: {
        mysql_clear_password: () => () => buffer.from('root')
    }
})

module.exports = pool