export const getPageCount = (totalItemCount, itemsOnPageLimit) => {
  return Math.ceil(totalItemCount / itemsOnPageLimit) + 1
}

export const getNumberSequence = (maxNumber) => {
  let result = [];
  for(let i = 1; i < maxNumber; i++) {
    result.push(i);
  }
  return result;
}