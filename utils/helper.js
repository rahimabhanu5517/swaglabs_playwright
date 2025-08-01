/**
 * Return N random indices from range [0, total-1]
 * @param {number} total
 * @param {number} count
 * @returns {number[]}
 */
function getRandomIndices(total, count) {
  const indices = [...Array(total).keys()];
  return indices.sort(() => 0.5 - Math.random()).slice(0, count);
}

module.exports = getRandomIndices;
