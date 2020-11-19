import React, { useState } from "react"

const Switch = ({ isDark, setDark }) => {
  const handleClick = () => {
    setDark(!isDark)
    console.log(isDark)
  }
  return (
    <div className="switch-box">
      <label className="switch">
        <input type="checkbox" checked={isDark} onClick={handleClick} />
        <span className="slider round">🌙</span>
      </label>
    </div>
  )
}

export default Switch
