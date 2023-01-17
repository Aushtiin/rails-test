export const hexToHSL = hex => {
  // Convert hex to RGB first
  let r, g, b;
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `hsl(${h},${s}%,${l}%)`;
};

export const adjustBrightnessHSL = (hslString, offset) => {
  const brightness = parseFloat(hslString.split(",")[2].split("%")[0]);
  const hslArr = hslString.split(",").slice(0, 2);
  hslArr.push(`${brightness + offset}%)`);
  return hslArr.join(",");
};

export const buildRepeatingLinearGradient = (hex, deg, width, widthUnit, offset) => {
  return `repeating-linear-gradient(${deg}deg, ${hexToHSL(hex)}, ${hexToHSL(
    hex,
  )} ${width}${widthUnit}, ${adjustBrightnessHSL(
    hexToHSL(hex),
    offset,
  )} ${width}${widthUnit}, ${adjustBrightnessHSL(hexToHSL(hex), offset)} ${width * 2}${widthUnit})`;
};

export const genRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
