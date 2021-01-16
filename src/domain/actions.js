import { createSlice } from '@reduxjs/toolkit'
import { createTableData, udpateTable } from '../components/util'

export const selectTable = state => state.order.tableData

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState: {
    tableData: []
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = createTableData(action.payload)
    },
    updateTableData: (state, action) => {
      state.tableData = udpateTable(action.payload, state.tableData)
    }
  }
})

export const {
  setTableData,
  updateTableData
} = orderBookSlice.actions

export const setTableAction = data => dispatch => {
  dispatch(setTableData(data))
}

export const updateTableAction = data => dispatch => {
  setTimeout(() => {
    dispatch(updateTableData(data))
  }, 1000)
}

export default orderBookSlice.reducer
