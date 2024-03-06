module.exports = (page, totalPage, delta = 2) => {
  const pages = [],
    pagesWithDot = [];
  let right = page + delta;
  let left = page - delta;

  for (i = 1; i <= totalPage; i++) {
    if (i == page || i == totalPage || i == 1 || (i >= left && i <= right)) {
      pages.push(i);
    }
  }

  for (j = 0; j < pages.length; j++) {
    pagesWithDot.push(pages[j]);
    if (pages[j + 1] - pages[j] >= delta) {
      pagesWithDot.push("...");
    }
  }
  return pagesWithDot;
};
