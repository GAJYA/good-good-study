/**
 * @param {number[]} prices
 * @return {number}
 */
let prices
prices = [7,6,4,3,1] // 0
prices = [1,2,3,4,5] // 4
prices = [7,1,5,3,6,4] // 7
var maxProfit = function (prices) {
    let total = 0
    for (let i = 0; i < prices.length-1; i++) {
        total += Math.max(prices[i + 1] - prices[i], 0);
    }
    return total
}

maxProfit([7,6,4,3,1])
maxProfit([1,2,3,4,5])
maxProfit([7,1,5,3,6,4])