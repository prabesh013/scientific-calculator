document.addEventListener("DOMContentLoaded", function () {
  const basic_btn = document.getElementById("basic-btn");
  const scientific_btn = document.getElementById("scientific-btn");

  const basic_fxn = document.getElementById("basic-fxn");
  const scientific_fxn = document.getElementById("scientific-fxn");

  const display = document.getElementById("calc-display");
  const buttons = document.getElementsByTagName("button");

  const sin_btn = document.getElementById("sin-btn");
  const cos_btn = document.getElementById("cos-btn");
  const tan_btn = document.getElementById("tan-btn");
  const natural_log_btn = document.getElementById("natural-log-btn");
  const log_btn = document.getElementById("log-btn");
  const ans_btn = document.getElementById("ans-btn");
  const sqrt_btn = document.getElementById("sqrt-btn");
  const pow_btn = document.getElementById("pow-btn");

  const acc_btn = document.getElementById("acc-btn");

  basic_btn.addEventListener("click", function () {
    // basic_btn.classList.add("btn-primary");
    basic_btn.classList.add("toggle-active");

    // scientific_btn.classList.remove("btn-primary");
    scientific_btn.classList.remove("toggle-active");

    basic_fxn.classList.remove("d-none");
    scientific_fxn.classList.add("d-none");
  });

  scientific_btn.addEventListener("click", function () {
    // scientific_btn.classList.add("btn-primary");
    // basic_btn.classList.remove("btn-primary");
    scientific_btn.classList.add("toggle-active");
    basic_btn.classList.remove("toggle-active");

    basic_fxn.classList.add("d-none");
    scientific_fxn.classList.remove("d-none");
    // scientific_fxn.classList.add("d-block");
  });

  function factorial(number) {
    let product = 1;
    for (let i = 1; i <= number; i++) {
      product = product * i;
    }
    return product;
  }

  function validateExpression(expression) {}

  function convert(current) {
    // const convertedValue = current
    //   .replace("×", "*")
    //   .replace("÷", "/")
    //   .replace("%", "*0.01")
    //   .replace("sin", "Math.sin")
    //   .replace("cos", "Math.cos")
    //   .replace("ln", "Math.log")
    //   .replace("π", "Math.PI")
    //   .replace("log", "Math.log10")
    //   .replace("e", "Math.E")
    //   .replace("tan", "Math.tan")
    //   .replace("√", "Math.sqrt")
    //   .replace("sin-1", "Math.asin")
    //   .replace("cos-1", "Math.acos")
    //   .replace("tan-1", "Math.atan");

    const convertedValue = current
      .replace("×", "*")
      .replace("÷", "/")
      .replace("%", "*0.01")
      .replace("π", "Math.PI")
      .replace("e", "Math.E")
      .replace("√", "Math.sqrt");
    // .replace("sin", "Math.sin")
    // .replace("cos", "Math.cos")
    // .replace("ln", "Math.log")
    // .replace("log", "Math.log10")
    // .replace("tan", "Math.tan")
    // .replace("√", "Math.sqrt")
    // .replace("sin-1", "Math.asin")
    // .replace("cos-1", "Math.acos")
    // .replace("tan-1", "Math.atan");
    console.log(convertedValue);
    return convertedValue;
  }

  function evaluateResult() {
    if (currentValue.includes("!")) {
      let numberOfFactorial = 0;
      for (let i = 0; i < currentValue.length; i++) {
        if (currentValue[i] == "!") numberOfFactorial++;
      }
      if (numberOfFactorial > 1) {
        throw "Too many factorials";
      } else {
        let number = currentValue.match(/\d+/g).map(Number)[0];
        let fact = factorial(number);
        currentValue = fact.toString();
      }
    } else if (currentValue.includes("^")) {
      let [x, y] = currentValue.split("^").map(Number);
      currentValue = `Math.pow(${x},${y})`;
    }

    const result = eval(convert(currentValue));

    if (result != undefined) {
      currentValue = result.toString();
      display.value = currentValue;
    } else {
      display.value = "0";
    }
    // acc_btn.innerHTML = "AC";
    previousValue = currentValue;
  }
  function reset() {
    currentValue = "";
    display.value = "0";
    revertInverseFunctionality();
  }
  function inverseFunctionality() {
    sin_btn.innerHTML = "sin<sup>-1</sup>";
    cos_btn.innerHTML = "cos<sup>-1</sup>";
    tan_btn.innerHTML = "tan<sup>-1</sup>";
    natural_log_btn.innerHTML = "e<sup>x</sup>";
    log_btn.innerHTML = "10<sup>x</sup>";
    ans_btn.innerHTML = "Rnd";
    sqrt_btn.innerHTML = "x<sup>2</sup>";
    pow_btn.innerHTML = "<sup>y</sup>√x";
  }
  function revertInverseFunctionality() {
    sin_btn.innerHTML = "sin";
    cos_btn.innerHTML = "cos";
    tan_btn.innerHTML = "tan";
    natural_log_btn.innerHTML = "ln";
    log_btn.innerHTML = "log";
    ans_btn.innerHTML = "Ans";
    sqrt_btn.innerHTML = "√";
    pow_btn.innerHTML = "x<sup>y</sup>";
  }

  let inverse = false;
  let currentValue = "";
  let previousValue = "";
  let angle = "";

  reset();

  // adding event handlers to every buttons
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", function () {
      let value = button.innerText;
      try {
        if (value == "AC") {
          reset();
        } else if (value == "Inv") {
          if (!inverse) {
            inverse = true;
            inverseFunctionality();
          } else {
            inverse = false;
            revertInverseFunctionality();
          }
        } else if (value == "=") {
          evaluateResult();
          currentValue = "";
        } else if (value == "Rad") {
          angle = value;
        } else if (value == "Deg") {
          angle = value;
        } else if (value == "x!") {
          value = currentValue;
          currentValue = currentValue + "!";
          display.value = currentValue;
        } else if (value == "EXP") {
          value = currentValue;
          currentValue = currentValue + "E";
          display.value = currentValue;
        } else if (value == "xy") {
          value = display.value;
          currentValue = value + "^";
          display.value = currentValue;
        } else if (value == "Ans") {
          display.value = "Ans";
          currentValue = previousValue;
          // } else if (value == "CE") {
          // currentValue = currentValue.slice(0, -1);
        } else {
          currentValue += value;
          display.value = currentValue;
        }
      } catch (error) {
        console.error(error);
        currentValue = "ERROR";
        display.value = currentValue;
      }
    });
  }
});
