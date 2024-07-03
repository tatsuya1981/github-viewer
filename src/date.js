export const today = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '-');
};
