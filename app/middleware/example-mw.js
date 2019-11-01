
export const example = (req, res, next) => {
  console.log("This is example middleware");
  next();
};
