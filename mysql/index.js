const mysql = require('mysql')
const config = require('./config')

const connection = mysql.createConnection({
    host: config.database.HOST,
    port: config.database.PORT,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})

connection.connect((err) => {
    console.log('connection success');
})
class Mysql {
    constructor() {}

    insert(values, column, table) {
        if (Array.isArray(column)) column = column.join(',')
        if (Array.isArray(values)) values = values.join(',')
        return new Promise(resolve => {
            connection.query(`insert into ${table} (${column}) values (${values})`, (err, res) => {
                if (err) {
                    throw err
                };
                resolve(res)
            });
        })
    }

    delete(condition, table) {
        if (Array.isArray(condition)) condition = condition.join(',')
        return new Promise(resolve => {
            connection.query(`delete from ${table} where ${condition}`, (err, res) => {
                if (err) {
                    throw err
                };
                resolve(res)
            })
        })
    }
    update(newVal, condition, table) {
        if (Array.isArray(newVal)) newVal = newVal.join(',')
        return new Promise(resolve => {
            connection.query(`update ${table} set ${newVal} where ${condition}`, (err, res) => {
                if (err) {
                    throw err
                };
                resolve(res)
            })
        })
    }

    select(column, table, condition = null, limit = null) {
        if (Array.isArray(column)) column = column.join(',')
        return new Promise(resolve => {
            if (condition && limit) {
                connection.query(`select ${column} from ${table} where ${condition} ${limit}`, (err, res) => {
                    if (err) {
                        throw err
                    };
                    resolve(res)
                });
            } else if (condition) {
                connection.query(`select ${column} from ${table} where ${condition}`, (err, res) => {
                    if (err) {
                        throw err
                    };
                    resolve(res)
                });
            } else if (limit) {
                connection.query(`select ${column} from ${table} ${limit}`, (err, res) => {
                    if (err) {
                        throw err
                    };
                    resolve(res)
                });
            } else {
                connection.query(`select ${column} from ${table}`, (err, res) => {
                    if (err) {
                        throw err
                    };
                    resolve(res)
                });
            }


        })
    }
    
    query() {
        return new Promise(resolve => {
            connection.query('select * from admin_info', (err, res) => {
                if (err) {
                    throw err
                };
                resolve(res)

            });
        })

    }
}

module.exports = new Mysql()