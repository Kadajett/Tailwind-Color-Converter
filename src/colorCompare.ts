import type { ColorList, FlatColorList } from "./types";

function flattenColorList(colors: ColorList): FlatColorList {
  let flatColors: FlatColorList = {};

  for (let color in colors) {
    if (typeof colors[color] === "string") {
      flatColors[color] = colors[color] as string;
    } else {
      for (let shade in colors[color] as { [shade: string]: string }) {
        flatColors[`${color}-${shade}`] = (
          colors[color] as { [shade: string]: string }
        )[shade];
      }
    }
  }

  return flatColors;
}

function hexToRgb(hex: string) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function colorDistance(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
) {
  let dr = color1.r - color2.r;
  let dg = color1.g - color2.g;
  let db = color1.b - color2.b;

  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function findNearestColor(color: string, colors: ColorList) {
  let flatColors = flattenColorList(colors);
  let inputColorRgb = hexToRgb(color);

  if (!inputColorRgb) {
    throw new Error("Invalid color input");
  }

  let closestColor = "";
  let minDistance = Infinity;

  for (let col in flatColors) {
    let colRgb = hexToRgb(flatColors[col]);

    if (colRgb) {
      let distance = colorDistance(inputColorRgb, colRgb);

      if (distance < minDistance) {
        minDistance = distance;
        closestColor = col;
      }
    }
  }

  return {
    color: closestColor,
    distance: minDistance,
  };
}

export default findNearestColor;
