import { useState , useEffect } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [items, setItems] = useState([])


  async function handleDelete(id) {
  await fetch(`/api/hello?id=${id}`, { method: 'DELETE' })
  fetchData()
}



  async function handleSubmit(event) {
    event.preventDefault()

    const res = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })              

    const json = await res.json()
    setItems([...items, json])
    setName('')
  }

  async function fetchData() {
    const res = await fetch('/api/hello')
    const json = await res.json()
    setItems(json)
  }

  useEffect(() => {
    fetchData()
  },[items])

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <button type="submit">Add item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
          
          </li>
        ))}
      </ul>
    </div>
  )
}