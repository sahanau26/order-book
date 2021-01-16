import React from 'react'
import PropTypes from 'prop-types'

import styles from './../tracker.module.scss'

export const Table = ({ data = [] }) => {
  return (
    <table className={styles.table}>
         <thead>
            <tr>
                <th>PRICE</th>
                <th>TOTAL</th>
                <th>AMOUNT</th>
                <th>COUNT</th>
            </tr>
        </thead>
        <tbody>{
             Array.isArray(data) && data.length
               ? data.slice(0, 25).map(
                   (ele, i) => (
                    <tr  key={i}>
                      <td>{ele.price}</td>
                      <td>{ele.total}</td>
                      <td>{ele.amount}</td>
                      <td>{ele.count}</td>
                    </tr>
                   )
                 )
               : null
        }</tbody>
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array
}
