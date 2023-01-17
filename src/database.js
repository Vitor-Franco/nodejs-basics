import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8').then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      this.#persist()
    })
  }

  #persist() {
    return fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table, id) {
    const data = this.select(table)

    const index = data.findIndex(item => item.id === id)

    if(index > -1) {
      data.splice(index, 1)
      
      this.#persist()
    }
  }

  update(table, id, data) {
    const tableData = this.select(table)

    const index = tableData.findIndex(item => item.id === id)

    if(index > -1) {
      tableData.splice(index, 1, data)
      
      this.#persist()
    }
  }
}