export const getNextPhotoIndex = (index, direction, count) =>
  count > 0 ? (((index + direction) % count) + count) % count : 0;

export const getSwipeDirection = (start, end) => {
  if (!start || !end) return 0;
  const horizontal = end.x - start.x;
  const vertical = end.y - start.y;
  if (Math.abs(horizontal) < 50 || Math.abs(horizontal) <= Math.abs(vertical)) return 0;
  return horizontal < 0 ? 1 : -1;
};
