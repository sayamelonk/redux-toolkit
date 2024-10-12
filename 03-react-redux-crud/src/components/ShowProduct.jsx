import { useDispatch, useSelector } from 'react-redux'
import {
  productSelector,
  getProduct,
  deleteProduct,
} from '../features/productSlice'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ShowProduct() {
  const dispatch = useDispatch()
  const product = useSelector(productSelector.selectAll)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])

  useEffect(() => {
    dispatch(getProduct()).finally(() => setLoading(false))
  }, [dispatch])

  // console.log(product)

  return (
    <div className="box mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="add" className="button is-success is-small">
            {' '}
            ADD NEW
          </Link>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>barang</th>
                <th>price</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.barang}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link
                      to={`edit/${product.id}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => dispatch(deleteProduct(product.id))}
                      className="button is-small is-danger ml-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default ShowProduct
