import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ColorShades } from "./color-shades"
import { ChromePicker } from "react-color"
import { generateColors } from "../lib/generate-colors"
import copy from "copy-to-clipboard"

export function ColorPalette({
  color,
  initialShadeNumber = 4,
  initialShadeScale = 0.85,
}) {
  const [mainColor, setMainColor] = useState()
  const [shadeNumber, setShadeNumber] = useState(initialShadeNumber)
  const [shadeScale, setShadeScale] = useState(initialShadeScale)
  const [showColorPicker, setShowColorPicker] = useState(false)

  const toggleColorPicker = () => setShowColorPicker(!showColorPicker)

  useEffect(() => {
    if (color !== mainColor) {
      setMainColor(color)
    }
  }, [color])

  return (
    <div className="relative bg-gray-800 w-full h-full p-4 text-gray-300">
      <h1 className="text-5xl text-center pb-4 font-black">Color Palette</h1>

      <div className="flex justify-around mb-4 px-4 items-start">
        <div className="rounded bg-gray-700 p-3">
          <h2 className="text-xl font-semibold">Settings</h2>
          <hr className="border-b border-gray-800" />
          <div className="flex justify-center py-3">
            <ChromePicker
              color={mainColor}
              onChangeComplete={color => setMainColor(color.hex)}
            />
          </div>
          <div className="h-12 items-center flex w-full justify-between">
            Shades:
            <input
              type="number"
              className={`
            rounded px-3 py-1 pr-1 text-lg font-semibold
            bg-gray-800 text-gray-300 w-20 focus:outline-none text-center`}
              maxLength={2}
              min={1}
              max={5}
              value={shadeNumber}
              onChange={e => setShadeNumber(parseInt(e.target.value))}
            />
          </div>
          <div className="h-12 items-center flex w-full justify-between">
            Contrast:
            <input
              type="number"
              className={`
            rounded px-3 py-1 pr-1 text-lg font-semibold
            bg-gray-800 text-gray-300 w-20 focus:outline-none text-center`}
              min={0.2}
              max={0.99}
              step={0.05}
              value={parseFloat(shadeScale).toFixed(2)}
              onChange={e => setShadeScale(parseFloat(e.target.value))}
            />
          </div>
        </div>
        {mainColor && (
          <div className="rounded overflow-hidden">
            <ColorShades
              mainColor={mainColor}
              shadeNumber={shadeNumber}
              shadeScale={shadeScale}
            />
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          className="rounded py-2 px-4 uppercase text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold focus:outline-none active:bg-gray-700 active:text-gray-300 transition-ease"
          onClick={() => copyToClipboard(mainColor, shadeNumber, shadeScale)}
        >
          Copy to clipboard
        </button>
      </div>
    </div>
  )
}

ColorPalette.propTypes = {
  color: PropTypes.string,
  initialShadeNumber: PropTypes.number,
  initialShadeScale: PropTypes.number,
}

function copyToClipboard(mainColor, shades, scale) {
  const list = generateColors(mainColor, shades, scale)
  copy(list.join("\n"))
}
