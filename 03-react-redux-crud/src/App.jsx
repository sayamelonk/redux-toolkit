import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShowProduct from './components/ShowProduct'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/delete/:id" element={<h1>delete</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
