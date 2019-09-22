import chroma from "chroma-js"

export function generateColors(mainColor, shades = 4, scale = 0.8) {
  const finalList = [mainColor]

  let l = chroma(mainColor).get("hsl.l")
  l = Math.min(l, 1 - l) * scale
  const step = l / shades

  for (let i = 0; i < shades; i++) {
    finalList.push(
      chroma(mainColor)
        .set("hsl.l", `-${step * (i + 1)}`)
        .hex(),
    )
    finalList.unshift(
      chroma(mainColor)
        .set("hsl.l", `+${step * (i + 1)}`)
        // .set("hsl.s", `+${(step / 10) * (i + 1)}`)
        .hex(),
    )
  }

  return finalList
}
