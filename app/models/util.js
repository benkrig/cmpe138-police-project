
// Returns a string in the format: "column[i] = value[i] for each column and value"
export const generateSet = (columns, values) =>
  columns.forEach(columns, (col, i) => {
    let m = `${col} = ${values[i]}`;
    if (i !== columns.length - 1) {
      m += ", ";
    }
    return m;
  });
