import React from "react"
import PropTypes from "prop-types"
import { generateColors } from "../lib/generate-colors"
import chroma from "chroma-js"

export function ColorShades({ mainColor, shadeNumber, shadeScale }) {
  const shades = generateColors(mainColor, shadeNumber, shadeScale)

  return (
    <div className="flex flex-col">
      {shades &&
        shades.map((shade, i) => {
          const dark = chroma(shade.hex).get("lab.l") > 60
          return (
            <div key={i}>
              <div
                className={`w-64 h-12 flex justify-between items-center transition-ease px-2 ${
                  dark ? "text-gray-900" : "text-white"
                }`}
                style={{
                  backgroundColor: shade.hex,
                }}
              >
                <div>{shade.name}</div>
                <div>{shade.hex}</div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

ColorShades.propTypes = {
  mainColor: PropTypes.string,
  shadeNumber: PropTypes.number,
  shadeScale: PropTypes.number,
}
