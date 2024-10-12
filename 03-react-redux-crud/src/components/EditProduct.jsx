import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  productSelector,
  updateProduct,
  getProduct,
} from '../features/productSlice'

function EditProduct() {
  const [barang, setBarang] = useState('')
  const [price, setPrice] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const product = useSelector((state) => productSelector.selectById(state, id))

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])

  useEffect(() => {
    if (product) {
      setBarang(product.barang)
      setPrice(product.price)
    }
  }, [product])

  const handleUpdate = async (e) => {
    e.preventDefault()
    await dispatch(updateProduct({ id, price, barang }))
    navigate('/')
  }

  return (
    <div>
      <form className="box mt-5" onSubmit={handleUpdate}>
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
          <button className="button is-success">Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
