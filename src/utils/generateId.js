let counter = 0;

export const generateId = (prefix = "id") => {
  counter += 1;
  return `${prefix}-${counter}`;
};
