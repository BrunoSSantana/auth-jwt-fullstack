import { useState } from "react";

export function Button() {

  const [counter, setCounter] = useState(0)

  function countNumber() {
    setCounter(counter + 1)  
  }

  return (
    <button onClick={countNumber}>{counter}</button>
  )
}