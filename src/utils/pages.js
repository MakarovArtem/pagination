export const getPageCount = (totalItemCount, itemsOnPageLimit) => {
  return Math.ceil(totalItemCount / itemsOnPageLimit);
}

export const getNumberSequence = (maxNumber) => {
  let result = [];
  for(let i = 0; i < maxNumber; i++) {
    result.push(i + 1);
  }
  return result;
}

export const getAdaptivePageNumbers = (pageCount, curr, range, separator = '...') => {

  let arr = [];

  for(let i = 0; i < pageCount; i++) {
    arr.push(i + 1);
  }

  const currentPageIndex = arr.indexOf(curr);
  const firstPageNumber = arr.at(0);
  const lastPageNumber = arr.at(-1);

  const rangeLeft = currentPageIndex <= range ? arr.slice(0, currentPageIndex) : arr.slice(currentPageIndex - range, currentPageIndex);
  const rangeRight = arr.slice(currentPageIndex + 1, currentPageIndex + (range + 1));
  const isRangeLeftEmpty = !rangeLeft.length;
  const isRangeRightEmpty = !rangeRight.length;

  const intersectionLeft = (rangeLeft.includes(firstPageNumber) || isRangeLeftEmpty) ? true : false;
  const intersectionRight = (rangeRight.includes(lastPageNumber) || isRangeRightEmpty) ? true : false;
  const intersection = intersectionLeft || intersectionRight;

  const followingLeft = arr.at(1) === rangeLeft.at(0) ? true : false;
  const followingRight = arr.at(-2) === rangeRight.at(-1) ? true : false;
  const following = followingLeft || followingRight;

  let result = [];

  if(!intersection) {
    
    if(!following) {
      result = [firstPageNumber, separator, ...rangeLeft, curr, ...rangeRight, separator, lastPageNumber];
    } else if(followingLeft) {
      result = [firstPageNumber, ...rangeLeft, curr, ...rangeRight, separator, lastPageNumber];
    } else if(followingRight) {
      result = [firstPageNumber, separator, ...rangeLeft, curr, ...rangeRight, lastPageNumber];
    }

  } else if(intersectionLeft) {
    result = [...rangeLeft, curr, ...rangeRight, separator, lastPageNumber];
  } else if(intersectionRight) {
    result = [firstPageNumber,  separator, ...rangeLeft, curr, ...rangeRight];
  }
  return result;
}