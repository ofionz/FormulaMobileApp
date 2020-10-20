const { isArray } = Array;
export { isArray };



/**
 * Generate random string
 * @param {string} prefix
 */
export const generateId = (prefix = '') => (
  `${prefix}${Math.random()
    .toString(36)
    .substring(2, 10)}`
);
