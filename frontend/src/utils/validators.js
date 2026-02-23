export const validators = {
  required: (value) => (value && value.trim().length > 0 ? null : "Required"),
  minLength: (value, min) => (value && value.length >= min ? null : `Min length ${min}`),
};
