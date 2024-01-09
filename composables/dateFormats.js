export const formatRawDate = (rawDate) => {
  const year = String(rawDate).slice(0, 4);
  const month = String(rawDate).slice(4, 6);
  const day = String(rawDate).slice(6, 8);
  return `${day}.${month}.${year}`;
};

export const formatDate = (date) => {
  const newDate = new Date(date);
  const mm = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const dd = newDate.getDate().toString().padStart(2, '0');
  const yyyy = newDate.getFullYear().toString();

  return `${mm}.${dd}.${yyyy}`;
};
