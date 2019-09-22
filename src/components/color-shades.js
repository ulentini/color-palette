import React from "react"
import PropTypes from "prop-types"
import { generateColors } from "../lib/generate-colors"
import chroma from "chroma-js"

export function ColorShades({ mainColor, shadeNumber, shadeScale }) {
  const shades = generateColors(mainColor, shadeNumber, shadeScale)
  const nameStep = Math.round(1000 / (shadeNumber * 2 + 2))

  return (
    <div className="flex flex-col">
      {shades &&
        shades.map((shade, i) => {
          const name = nameStep * (i + 1)
          const dark = chroma(shade).get("lab.l") > 60
          return (
            <div key={i}>
              <div
                className={`w-64 h-12 flex justify-between items-center transition-ease px-2 ${
                  dark ? "text-gray-900" : "text-white"
                }`}
                style={{
                  backgroundColor: shade,
                }}
              >
                <div>{name}</div>
                <div>{shade}</div>
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
