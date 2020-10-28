// eslint-disable-next-line no-unused-vars
export default   function  withCurrencySymbol(value) {
  if (!value) return '';
  value = value.toString();
  return value.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ').concat('₽');
}
