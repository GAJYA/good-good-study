var tmp = 123;
if (true) {
  console.log(tmp);
  let tmp;
}

The variables are created when their containing Lexical Environment is instantiated but may not be accessed inany way until the variable’s LexicalBinding is evaluated