let arr = new Array(1, 2, 3, 4, 5);
arr.forEach(item => console.log(item));

for (const item in arr) {
  if (Object.hasOwnProperty.call(arr, item)) {
    const element = arr[item];
    console.log(item);
  }
}