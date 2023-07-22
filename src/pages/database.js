const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('mydatabase.db')


db.close()
const fs = require('fs')

const filename = 'mydatabase.db'

fs.access(filename, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(`${filename} exists`)
})

