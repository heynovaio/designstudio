import * as React from 'react'

export const Container = ({children, className}) => {
  return (
    <div className={`Container ${className}`}>
      {children}
    </div>
  )
}

export const Button = ({children, variant="Primary"}) => {

  return (
    <div className={`Btn${variant}`}>
      {children}
    </div>
  )
}