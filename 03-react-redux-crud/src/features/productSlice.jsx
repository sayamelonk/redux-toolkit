import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getProduct = createAsyncThunk('product/getProduct', async () => {
  const response = await axios.get('http://localhost:5000/products')
  const data = response.data
  return data
})

export const saveProduct = createAsyncThunk(
  'products/saveProduct',
  async ({ barang, price }) => {
    const response = await axios.post('http://localhost:5000/products', {
      barang: barang,
      price: price,
    })

    const data = response.data
    return data
  },
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, barang, price }) => {
    const response = await axios.put(`http://localhost:5000/products/${id}`, {
      barang: barang,
      price: price,
    })
    const data = response.data
    return data
  },
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`)
    return id
  },
)

const productEntry = createEntityAdapter({
  selectId: (product) => product.id,
})

const productSlice = createSlice({
  name: 'product',
  initialState: productEntry.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        productEntry.setAll(state, action.payload)
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        productEntry.addOne(state, action.payload)
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        productEntry.removeOne(state, action.payload)
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        productEntry.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        })
      })
  },
})

export const productSelector = productEntry.getSelectors(
  (state) => state.product,
)

export default productSlice.reducer
