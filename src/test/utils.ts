export const toRGB = (color: string) => {
  const { style } = new Option();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  style.color = color;
  return style.color;
};
