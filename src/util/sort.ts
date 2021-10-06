export const awesomeSort = (data: any[], dir = 'ASC', key: null | string = null) => {
  const firstElement = (key) ? data[0][key] : data[0];
  const isNumber = !isNaN(firstElement);
  const isAsc = dir.toUpperCase() === 'ASC';

  if(isNumber) {
    return data.sort((a: { [x: string]: any; },b: { [x: string]: any; }) => {
      const x = (key) ? a[key] : a;
      const y = (key) ? b[key] : b;
      if(isAsc) return x - y;
      if(!isAsc) return y - x;
      return 0;
    })
  }
  return data.sort((a: { [x: string]: any; },b: { [x: string]: any; }) => {
      const x = JSON.stringify( (key) ? a[key] : a);
      const y = JSON.stringify( (key) ? b[key] : b);

      if(isAsc) return x.localeCompare(y);
      if(!isAsc) return y.localeCompare(x);
      return 0;
    })

}
