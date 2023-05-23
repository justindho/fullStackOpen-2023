import { useState } from "react"

export const useField = (name, type) => {
  const [value, setValue] = useState('')
  
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = (event) => {
    setValue('')
  }

  return {
    name,
    type,
    value,
    onChange,
    clear
  }
}