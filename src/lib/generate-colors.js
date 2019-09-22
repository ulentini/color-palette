import chroma from "chroma-js"

export function generateColors(mainColor, shades = 4, scale = 0.8) {
  const list = [mainColor]

  let l = chroma(mainColor).get("hsl.l")
  l = Math.min(l, 1 - l) * scale
  const step = l / shades

  for (let i = 0; i < shades; i++) {
    list.push(
      chroma(mainColor)
        .set("hsl.l", `-${step * (i + 1)}`)
        .hex(),
    )
    list.unshift(
      chroma(mainColor)
        .set("hsl.l", `+${step * (i + 1)}`)
        // .set("hsl.s", `+${(step / 10) * (i + 1)}`)
        .hex(),
    )
  }

  const nameStep = Math.round(1000 / (shades * 2 + 2))

  const finalList = list.map((hex, i) => {
    const name = nameStep * (i + 1)
    return {
      name,
      hex,
    }
  })

  return finalList
}
