import fs from 'fs'
import path from 'path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
})

export default async function handler(req, res) {
  const db = await dbPromise

  if (req.method === 'POST') {
    const { name } = req.body
    const result = await db.run(`INSERT INTO items (name) VALUES (?)`, name)
    const newItem = { id: result.lastID, name }
    res.status(201).json(newItem)
  } else if (req.method === 'GET') {
    const items = await db.all(`SELECT * FROM items`)
    res.status(200).json(items)
  } else if (req.method === 'DELETE') {
    const { id } = req.query
    await db.run(`DELETE FROM items WHERE id = ?`, id)
    res.status(200).json({ message: 'Item deleted' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}