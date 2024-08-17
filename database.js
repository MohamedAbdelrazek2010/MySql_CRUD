import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

// this is like a pool of connections used to connect to my database

const myPool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

// res resolves an array so the destructuring assignment allows you to get the
// first element of the array as the (res) resolves the query only so it gets
// the columns and rows 
// while the output is theses and the types of columns
// so we add only to get the first element of the array
export async function getWriters() {
    const [res] = await myPool.query("select * from writers_table")
    return res
}

export async function getWriter(id) {
    const [resOfOneWriter] = await myPool.query(
        `select * from writers_table where id = ?` , [id]
    )
    return resOfOneWriter[0] // add this to get only the object i add not in an array
    // as the select statement always returns array of objects
}

export async function createWriter(id , name , famous_novels) {
    const result = await myPool.query(
        `insert into writers_table (id , name , famous_novels)
        values (?,?,?)`, [id, name, famous_novels]
    )
    return result
}
