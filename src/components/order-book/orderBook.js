import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Table as BuyTable } from '../tracker/buy/table'
import { Table as SaleTable } from '../tracker/sale/table'
import { Chart } from '../tracker/chart'

import styles from './orderBook.module.scss'

import {
  setTableAction,
  updateTableAction,
  selectTable
} from '../../domain/actions'

export function Orderbook () {
  const tableData = useSelector(selectTable)
  const dispatch = useDispatch()

  useEffect(() => {
    const subscribeMessage = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD',
      len: 25
    })

    const webSocket = new WebSocket('wss://api-pub.bitfinex.com/ws/2')

    webSocket.onopen = () => webSocket.send(subscribeMessage)

    webSocket.onmessage = evt => {
      const data = JSON.parse(evt.data)
      if (Array.isArray(data) && data[1].length > 3) {
        dispatch(setTableAction(data[1]))
      } else if (Array.isArray(data) && data[1].length === 3) {
        dispatch(updateTableAction(data[1]))
      }
    }

    return () => {
      if (webSocket.OPEN && !webSocket.CONNECTING) {
        webSocket.close()
      }
    }
  }, [])

  return (
    <div>
      <span className={styles.wrapper}>
        <BuyTable data={tableData.buy} />
        <Chart data={tableData.buy} fill="#16b157" transformX="-1" transformY ="1" />
      </span>
      <span className={styles.wrapper}>
        <SaleTable data={tableData.sale} />
        <Chart data={tableData.sale} fill="#f05359" transformX="1" transformY ="1" />
      </span>
    </div>
  )
}
