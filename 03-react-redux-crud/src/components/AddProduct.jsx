import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveProduct } from '../features/productSlice'

function AddProduct() {
  const [loading, setLoading] = useState(false)
  const [barang, setBarang] = useState('')
  const [price, setPrice] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createProduct = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)
      await dispatch(saveProduct({ barang, price }))
      setLoading(false)
      navigate('/')
    },
    [dispatch, navigate, barang, price],
  )
  return (
    <div>
      <form className="box mt-5" onSubmit={createProduct}>
        <div className="field">
          <label className="label">Barang</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text barang"
              value={barang}
              onChange={(e) => setBarang(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Text price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          {loading && <p>Loading...</p>}
          <button className="button is-success">Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
