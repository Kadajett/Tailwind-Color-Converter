type ColorList = {
  [color: string]: string | { [shade: string]: string };
};

type FlatColorList = {
  [color: string]: string;
};

export { ColorList, FlatColorList };
