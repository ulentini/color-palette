import React from "react"
import "../css/tailwind.css"
import { ColorPalette } from "./color-palette"

function App() {
  return (
    <div className="h-screen w-full font-sans bg-gray-900 flex justify-center items-center">
      <div className="rounded-lg shadow-lg container overflow-hidden">
        <ColorPalette color="#ff0000" />
      </div>
    </div>
  )
}

export default App
