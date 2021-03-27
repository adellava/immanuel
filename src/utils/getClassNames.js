const getClassNames = (...myArgs) => {
  var classes = [];

  for (var i = 0; i < myArgs.length; i++) {
    var arg = myArgs[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(getClassNames(...arg));
    } else if (argType === "object") {
      for (var key in arg) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
};

export default getClassNames;
