import React from 'react'

export const InputError = ({text}) => {
  return (
    <p className="transition-all duration-200 text-sm text-red-400 font-semibold mt-2">{text}</p>
  )
}
