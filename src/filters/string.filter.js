// eslint-disable-next-line no-unused-vars
export default function stringFilter(value, format) {
  if (format.includes("capitalize")) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
