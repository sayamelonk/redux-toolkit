import { useState } from 'react'
import Parent1 from './components/Parent1'

function App() {
  const [name, setName] = useState('') // Destructure both name and setName
  useState(() => {
    setName('Pojok Kamar')
  }, [])
  return (
    <>
      <h1>Hello World</h1>
      <Parent1 name={name} />
    </>
  )
}

export default App
