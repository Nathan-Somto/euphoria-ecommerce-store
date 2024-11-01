import { ProductResponse } from "../../../components/product";
import { filterKeys } from "./types";
// checks if two colors are similar
// the filter color passed might be a shade of the color i.e like pink but if the product color 
// is #FF69B4 it should be considered as pink 
// we use the  euclidean distance formular
// https://en.wikipedia.org/wiki/Color_difference
const hexToRgb = (hex: string) => {
  const colorCode = hex.slice(1); // removes the #
  let r, g, b;
  if (colorCode.length === 3) {
    let Rs = colorCode.slice(0, 1)
    let Gs = colorCode.slice(1, 2);
    let Bs = colorCode.slice(2, 3);
    r = parseInt(Rs + Rs, 16);
    g = parseInt(Gs + Gs, 16);
    b = parseInt(Bs + Bs, 16);
  }
  else {
    r = parseInt(colorCode.slice(0, 2), 16);
    g = parseInt(colorCode.slice(2, 4), 16);
    b = parseInt(colorCode.slice(4, 6), 16)
  }
  return {
    r, g, b
  }
}
const isSimilarColor = (filterColor: string, testColor: string, threshold = 100) => {
  const { r: r1, g: g1, b: b1 } = hexToRgb(filterColor)
  const { r: r2, g: g2, b: b2 } = hexToRgb(testColor)
  let rsq = Math.pow((r2 - r1), 2);
  let gsq = Math.pow((g2 - g1), 2);
  let bsq = Math.pow((b2 - b1), 2);
  const d = Math.sqrt(rsq + gsq + bsq);
  console.log("d: ", d)
  return d <= 100
}
const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
type Filter = {
  key: filterKeys;
  value: string;
};
const isFilterKey = (key: string): key is filterKeys => {
  if (key === "category" || key === "size" || key === "price" || key === "type" || key === "colors") return true
  return false
}
export const convertToFilters = (obj: Record<string, string>): Filter[] => {
  const newObj: Filter[] = [];
  for (const key in obj) {
    if (isFilterKey(key)) {
      newObj.push({
        key,
        value: obj[key]
      });
    }
  }
  return newObj;
}

export const filterProducts = (products: ProductResponse, filters: Filter[]) => {

  const combinedFilter = (product: ProductResponse[number]) => {
    // handles a combination of filters
    return filters.every(({ key, value }) => {
      switch (key) {
        case 'category':
          if (value === 'all') return true
          return product.category === value;

        case 'size':
          if (value === 'none') return true;
          return product.size.some((item) => item === value);

        case 'colors':
          if (typeof value !== 'string') return true;
          if (value === 'transparent') return true;
          return product.colors.some((item) => isSimilarColor(value, item));

        case 'price':
          if (typeof value !== 'string') return true;
          const [min, max] = value.split(' ');
          return isInRange(product.price, +min, +max);

        default:
          return true;
      }
    });
  };

  return products.filter(combinedFilter);
};
