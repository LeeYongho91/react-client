export function dataFormat(date) {
  let tDate = new Date(date);
  tDate.setHours(tDate.getHours() + 9);
  tDate = tDate.toISOString().slice(0, 19).replace(/-/g, '-').replace('T', ' ');
  return tDate;
}
