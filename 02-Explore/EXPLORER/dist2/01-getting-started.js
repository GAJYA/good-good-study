function sum(a, b) {
  return a + b;
}

sum(100, 100); // sum('100', '100')
//  yarn flow运行不起作用
// 报错：yarn run v1.15.2
// $ D:\Git \day-day-up\EXPLORER\node_modules\.bin\flow
// Lost connection to the flow server (0 retries remaining): /Out of retries, exiting!

/*
 问题原因，路径中存在中文，没有找到flow，原来设置的是Git项目，找的是Git下的目录  
*/