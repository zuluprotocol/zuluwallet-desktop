import React from 'react'

import { style as defaultStyle } from './style'

export function Tick({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox='0 0 16 16' style={{ ...defaultStyle, ...style }}>
      <path
        d='M14,3c-0.28,0-0.53,0.11-0.71,0.29L6,10.59L2.71,7.29C2.53,7.11,2.28,7,2,7
			C1.45,7,1,7.45,1,8c0,0.28,0.11,0.53,0.29,0.71l4,4C5.47,12.89,5.72,13,6,13s0.53-0.11,0.71-0.29l8-8C14.89,4.53,15,4.28,15,4
			C15,3.45,14.55,3,14,3z'
      />
    </svg>
  )
}
