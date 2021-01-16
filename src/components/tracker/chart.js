import React, { memo } from 'react'
import PropTypes from 'prop-types'

import styles from './tracker.module.scss'

const Diagram = ({ data = [], fill="#16b157", transformX = -1, transformY = 1 }) => {
  const style = {
    fill,
    transform: `scale(${transformX},${transformY})`
  }
  return (
    <svg className={styles.chart} style={style}>
        {
            Array.isArray(data) && data.length && data.slice(0, 25).map(
              (ele, i) => (
                <rect x="1" y={i * 17} width={`${ele.total}%`} height="17" fillOpacity="0.2" key={i}></rect>
              )
            )
        }
    </svg>
  )
}

export const Chart = memo(Diagram)

Chart.propTypes = {
  data: PropTypes.array,
  fill: PropTypes.string,
  transformX: PropTypes.string,
  transformY: PropTypes.string
}
