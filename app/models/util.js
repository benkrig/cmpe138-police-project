// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

// Returns a string in the format: "column[i] = value[i] for each column and value"
export const generateSet = (columns, values) => {
  let set = "";
  columns.forEach((col, i) => {
    // if the column is a string, we need to wrap the value with ''
    const value = typeof values[i] === "string" ? `'${values[i]}'` : values[i];

    let m = `${col} = ${value}`;
    if (i !== columns.length - 1) {
      m += ", ";
    }
    set = set + m;
  });
  console.log(set);
  return set;
};
