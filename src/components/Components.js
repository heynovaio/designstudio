import * as React from 'react'

export const Container = ({children}) => {
  return (
    <div className="Container">
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