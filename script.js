// --- Mode Switching ---
function showMode(mode) {
  document.querySelectorAll('.mode-content').forEach(el => el.style.display = 'none');
  document.getElementById(mode).style.display = (mode === 'home') ? 'flex' : 'block';
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  let idx = ['home','algebra','geometry','ai'].indexOf(mode);
  if(idx>=0) document.querySelectorAll('.mode-btn')[idx].classList.add('active');
  if (mode === 'algebra') showAlgebra('simple');
  if (mode === 'geometry') showGeometry('circle');
}

// --- Algebra Calculators ---
const algebraMain = document.getElementById('algebra-main');
function showAlgebra(which) {
  algebraMain.innerHTML = '';
  document.querySelectorAll('#algebra-tools .tool-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`#algebra-tools .tool-item[onclick*="${which}"]`).classList.add('active');
  switch (which) {
    case 'simple':
      algebraMain.innerHTML = `
        <h2>Simple Calculator</h2>
        <input type="text" id="simple-display" readonly>
        <div class="calculator-grid simple-grid">
          <button class="simple-btn clear-btn" data-val="C">C</button>
          <button class="simple-btn" data-val="+/-">±</button>
          <button class="simple-btn" data-val="%">%</button>
          <button class="simple-btn" data-val="/">÷</button>
          <button class="simple-btn" data-val="7">7</button>
          <button class="simple-btn" data-val="8">8</button>
          <button class="simple-btn" data-val="9">9</button>
          <button class="simple-btn" data-val="*">×</button>
          <button class="simple-btn" data-val="4">4</button>
          <button class="simple-btn" data-val="5">5</button>
          <button class="simple-btn" data-val="6">6</button>
          <button class="simple-btn" data-val="-">−</button>
          <button class="simple-btn" data-val="1">1</button>
          <button class="simple-btn" data-val="2">2</button>
          <button class="simple-btn" data-val="3">3</button>
          <button class="simple-btn" data-val="+">+</button>
          <button class="simple-btn zero-btn" data-val="0">0</button>
          <button class="simple-btn" data-val=".">.</button>
          <button class="simple-btn" data-val="=">=</button>
        </div>
      `;
      simpleCalculatorInit();
      break;

    case 'scientific':
      algebraMain.innerHTML = `
        <h2>Scientific Calculator</h2>
        <input type="text" id="sci-display" readonly>
        <div class="calculator-grid sci-grid">
          <button class="sci-btn clear-btn" data-func="C">C</button>
          <button class="sci-btn" data-func="+/-">±</button>
          <button class="sci-btn" data-func="%">%</button>
          <button class="sci-btn" data-func="/">÷</button>
          <button class="sci-btn" data-func="sin">sin</button>
          <button class="sci-btn" data-func="cos">cos</button>
          <button class="sci-btn" data-func="tan">tan</button>
          <button class="sci-btn" data-func="*">×</button>
          <button class="sci-btn" data-func="7">7</button>
          <button class="sci-btn" data-func="8">8</button>
          <button class="sci-btn" data-func="9">9</button>
          <button class="sci-btn" data-func="-">−</button>
          <button class="sci-btn" data-func="4">4</button>
          <button class="sci-btn" data-func="5">5</button>
          <button class="sci-btn" data-func="6">6</button>
          <button class="sci-btn" data-func="+">+</button>
          <button class="sci-btn" data-func="1">1</button>
          <button class="sci-btn" data-func="2">2</button>
          <button class="sci-btn" data-func="3">3</button>
          <button class="sci-btn" data-func="=">=</button>
          <button class="sci-btn zero-btn" data-func="0">0</button>
          <button class="sci-btn" data-func=".">.</button>
          <button class="sci-btn" data-func="pi">π</button>
          <button class="sci-btn" data-func="e">e</button>
          <button class="sci-btn" data-func="^">xʸ</button>
          <button class="sci-btn" data-func="sqrt">√</button>
          <button class="sci-btn" data-func="ln">ln</button>
          <button class="sci-btn" data-func="log">log</button>
        </div>
      `;
      scientificCalculatorInit();
      break;

    case 'linear':
      algebraMain.innerHTML = `
        <h2>Linear Equation Solver (ax + b = 0)</h2>
        <form onsubmit="event.preventDefault(); solveLinear();">
          <label>a: <input type="number" id="lin-a" required></label>
          <label>b: <input type="number" id="lin-b" required></label>
          <button type="submit">Solve</button>
        </form>
        <div id="lin-result" class="animated-answer"></div>
      `;
      break;
    case 'quadratic':
      algebraMain.innerHTML = `
        <h2>Quadratic Equation Solver</h2>
        <form onsubmit="event.preventDefault(); solveQuadratic();">
          <label>a: <input type="number" id="quad-a" required></label>
          <label>b: <input type="number" id="quad-b" required></label>
          <label>c: <input type="number" id="quad-c" required></label>
          <button type="submit">Solve</button>
        </form>
        <div id="quad-result" class="animated-answer"></div>
      `;
      break;
    case 'fraction':
      algebraMain.innerHTML = `
        <h2>Fraction Simplifier</h2>
        <form onsubmit="event.preventDefault(); simplifyFraction();">
          <label>Numerator: <input type="number" id="frac-num" required></label>
          <label>Denominator: <input type="number" id="frac-den" required></label>
          <button type="submit">Simplify</button>
        </form>
        <div id="frac-result" class="animated-answer"></div>
      `;
      break;
    case 'system':
      algebraMain.innerHTML = `
        <h2>System of Equations Solver (2x2)</h2>
        <form onsubmit="event.preventDefault(); solveSystem();">
          <label>a₁: <input type="number" id="sys-a1" required></label>
          <label>b₁: <input type="number" id="sys-b1" required></label>
          <label>c₁: <input type="number" id="sys-c1" required></label>
          <label>a₂: <input type="number" id="sys-a2" required></label>
          <label>b₂: <input type="number" id="sys-b2" required></label>
          <label>c₂: <input type="number" id="sys-c2" required></label>
          <button type="submit">Solve</button>
        </form>
        <div id="sys-result" class="animated-answer"></div>
      `;
      break;
    case 'polynomial':
      algebraMain.innerHTML = `
        <h2>Cubic Polynomial Solver (ax³ + bx² + cx + d = 0)</h2>
        <form onsubmit="event.preventDefault(); solveCubic();">
          <label>a: <input type="number" id="cubic-a" required></label>
          <label>b: <input type="number" id="cubic-b" required></label>
          <label>c: <input type="number" id="cubic-c" required></label>
          <label>d: <input type="number" id="cubic-d" required></label>
          <button type="submit">Solve</button>
        </form>
        <div id="cubic-result" class="animated-answer"></div>
      `;
      break;
    case 'rational':
      algebraMain.innerHTML = `
        <h2>Rational Expression Simplifier</h2>
        <form onsubmit="event.preventDefault(); simplifyRational();">
          <label>Numerator: <input type="text" id="rat-num" required placeholder="e.g. 2x^2+4x"></label>
          <label>Denominator: <input type="text" id="rat-den" required placeholder="e.g. 2x"></label>
          <button type="submit">Simplify</button>
        </form>
        <div id="rat-result" class="animated-answer"></div>
      `;
      break;
    case 'exproot':
      algebraMain.innerHTML = `
        <h2>Exponent/Root Calculator</h2>
        <form onsubmit="event.preventDefault(); calcExpRoot();">
          <label>Base: <input type="number" id="exproot-base" required></label>
          <label>Exponent (for root use 1/n): <input type="number" id="exproot-exp" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="exproot-result" class="animated-answer"></div>
      `;
      break;
    case 'sci-notation':
      algebraMain.innerHTML = `
        <h2>Scientific Notation Converter</h2>
        <form onsubmit="event.preventDefault(); sciNotation();">
          <label>Number: <input type="number" id="sci-num" required></label>
          <button type="submit">Convert</button>
        </form>
        <div id="sci-result" class="animated-answer"></div>
      `;
      break;
    case 'sequence':
      algebraMain.innerHTML = `
        <h2>Sequence Calculator</h2>
        <form onsubmit="event.preventDefault(); sequenceCalc();">
          <label>Type:
            <select id="seq-type">
              <option value="arith">Arithmetic</option>
              <option value="geom">Geometric</option>
            </select>
          </label>
          <label>First Term (a₁): <input type="number" id="seq-a1" required></label>
          <label>Common Difference/Ratio (d/r): <input type="number" id="seq-dr" required></label>
          <label>n-th Term (n): <input type="number" id="seq-n" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="seq-result" class="animated-answer"></div>
      `;
      break;
  }
}

// --- Geometry Calculators ---
const geometryMain = document.getElementById('geometry-main');
function showGeometry(which) {
  geometryMain.innerHTML = '';
  document.querySelectorAll('#geometry-tools .tool-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`#geometry-tools .tool-item[onclick*="${which}"]`).classList.add('active');
  switch (which) {
    case 'circle':
      geometryMain.innerHTML = `
        <h2>Circle</h2>
        <form onsubmit="event.preventDefault(); areaPerimeterCircle();">
          <label>Radius: <input type="number" id="circle-radius" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="circle-result" class="animated-answer"></div>
      `;
      break;
    case 'rectangle':
      geometryMain.innerHTML = `
        <h2>Rectangle</h2>
        <form onsubmit="event.preventDefault(); areaPerimeterRectangle();">
          <label>Length: <input type="number" id="rect-l" min="0" step="any" required></label>
          <label>Width: <input type="number" id="rect-w" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="rect-result" class="animated-answer"></div>
      `;
      break;
    case 'square':
      geometryMain.innerHTML = `
        <h2>Square</h2>
        <form onsubmit="event.preventDefault(); areaPerimeterSquare();">
          <label>Side: <input type="number" id="sq-side" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="sq-result" class="animated-answer"></div>
      `;
      break;
    case 'parallelogram':
      geometryMain.innerHTML = `
        <h2>Parallelogram</h2>
        <form onsubmit="event.preventDefault(); areaPerimeterParallelogram();">
          <label>Base: <input type="number" id="par-base" min="0" step="any" required></label>
          <label>Height: <input type="number" id="par-height" min="0" step="any" required></label>
          <label>Side: <input type="number" id="par-side" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="par-result" class="animated-answer"></div>
      `;
      break;
    case 'trapezoid':
      geometryMain.innerHTML = `
        <h2>Trapezoid</h2>
        <form onsubmit="event.preventDefault(); areaPerimeterTrapezoid();">
          <label>Base 1: <input type="number" id="trap-b1" min="0" step="any" required></label>
          <label>Base 2: <input type="number" id="trap-b2" min="0" step="any" required></label>
          <label>Height: <input type="number" id="trap-h" min="0" step="any" required></label>
          <label>Side 1: <input type="number" id="trap-s1" min="0" step="any" required></label>
          <label>Side 2: <input type="number" id="trap-s2" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="trap-result" class="animated-answer"></div>
      `;
      break;
    case 'ellipse':
      geometryMain.innerHTML = `
        <h2>Ellipse</h2>
        <form onsubmit="event.preventDefault(); areaPerimeterEllipse();">
          <label>Semi-major axis (a): <input type="number" id="ell-a" min="0" step="any" required></label>
          <label>Semi-minor axis (b): <input type="number" id="ell-b" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="ell-result" class="animated-answer"></div>
      `;
      break;
    case 'sphere':
      geometryMain.innerHTML = `
        <h2>Sphere (Volume)</h2>
        <form onsubmit="event.preventDefault(); volumeSphere();">
          <label>Radius: <input type="number" id="sp-radius" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="sp-result" class="animated-answer"></div>
      `;
      break;
    case 'cylinder':
      geometryMain.innerHTML = `
        <h2>Cylinder (Volume)</h2>
        <form onsubmit="event.preventDefault(); volumeCylinder();">
          <label>Radius: <input type="number" id="cyl-radius" min="0" step="any" required></label>
          <label>Height: <input type="number" id="cyl-h" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="cyl-result" class="animated-answer"></div>
      `;
      break;
    case 'cone':
      geometryMain.innerHTML = `
        <h2>Cone (Volume)</h2>
        <form onsubmit="event.preventDefault(); volumeCone();">
          <label>Radius: <input type="number" id="cone-radius" min="0" step="any" required></label>
          <label>Height: <input type="number" id="cone-h" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="cone-result" class="animated-answer"></div>
      `;
      break;
    case 'prism':
      geometryMain.innerHTML = `
        <h2>Rectangular Prism (Volume)</h2>
        <form onsubmit="event.preventDefault(); volumePrism();">
          <label>Length: <input type="number" id="prism-l" min="0" step="any" required></label>
          <label>Width: <input type="number" id="prism-w" min="0" step="any" required></label>
          <label>Height: <input type="number" id="prism-h" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="prism-result" class="animated-answer"></div>
      `;
      break;
    case 'distance':
      geometryMain.innerHTML = `
        <h2>Distance Between Two Points</h2>
        <form onsubmit="event.preventDefault(); distance2Points();">
          <label>x₁: <input type="number" id="dist-x1" required></label>
          <label>y₁: <input type="number" id="dist-y1" required></label>
          <label>x₂: <input type="number" id="dist-x2" required></label>
          <label>y₂: <input type="number" id="dist-y2" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="dist-result" class="animated-answer"></div>
      `;
      break;
    case 'midpoint':
      geometryMain.innerHTML = `
        <h2>Midpoint Calculator</h2>
        <form onsubmit="event.preventDefault(); midpointCalc();">
          <label>x₁: <input type="number" id="mid-x1" required></label>
          <label>y₁: <input type="number" id="mid-y1" required></label>
          <label>x₂: <input type="number" id="mid-x2" required></label>
          <label>y₂: <input type="number" id="mid-y2" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="mid-result" class="animated-answer"></div>
      `;
      break;
    case 'slope':
      geometryMain.innerHTML = `
        <h2>Slope Calculator</h2>
        <form onsubmit="event.preventDefault(); slopeCalc();">
          <label>x₁: <input type="number" id="slope-x1" required></label>
          <label>y₁: <input type="number" id="slope-y1" required></label>
          <label>x₂: <input type="number" id="slope-x2" required></label>
          <label>y₂: <input type="number" id="slope-y2" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="slope-result" class="animated-answer"></div>
      `;
      break;
    case 'triangle':
      geometryMain.innerHTML = `
        <h2>Triangle (Area)</h2>
        <form onsubmit="event.preventDefault(); areaTriangle();">
          <label>Base: <input type="number" id="tri-base" min="0" step="any" required></label>
          <label>Height: <input type="number" id="tri-height" min="0" step="any" required></label>
          <button type="submit">Calculate</button>
        </form>
        <div id="triangle-result" class="animated-answer"></div>
      `;
      break;
    case 'pythagorean':
      geometryMain.innerHTML = `
        <h2>Pythagorean Theorem</h2>
        <form onsubmit="event.preventDefault(); pythagorean();">
          <label>a: <input type="number" id="pyth-a" min="0" step="any" required></label>
          <label>b: <input type="number" id="pyth-b" min="0" step="any" required></label>
          <button type="submit">Calculate c</button>
        </form>
        <div id="pyth-result" class="animated-answer"></div>
      `;
      break;
  }
}

// --- Simple Calculator Logic (Apple-style) ---
function simpleCalculatorInit() {
  let simpleExpr = '';
  const simpleDisplay = document.getElementById('simple-display');
  document.querySelectorAll('.simple-btn').forEach(btn => {
    btn.onclick = function() {
      let val = this.getAttribute('data-val');
      if (val === 'C') {
        simpleExpr = '';
      } else if (val === '=') {
        try {
          simpleExpr = eval(simpleExpr).toString();
        } catch {
          simpleExpr = 'Error';
        }
      } else if (val === '+/-') {
        if (simpleExpr) {
          if (simpleExpr.startsWith('-')) {
            simpleExpr = simpleExpr.substring(1);
          } else {
            simpleExpr = '-' + simpleExpr;
          }
        }
      } else if (val === '%') {
        if (simpleExpr) {
          simpleExpr = (parseFloat(simpleExpr) / 100).toString();
        }
      } else {
        simpleExpr += val;
      }
      simpleDisplay.value = simpleExpr;
    };
  });
}

// --- Scientific Calculator Logic (Apple-style) ---
function scientificCalculatorInit() {
  let sciExpr = '';
  const sciDisplay = document.getElementById('sci-display');
  function insertSci(val) {
    if (/^[0-9.]$/.test(val)) {
      sciExpr += val;
    } else if (val === '+' || val === '-' || val === '*' || val === '/' || val === '^') {
      sciExpr += ' ' + val + ' ';
    } else if (val === 'pi') {
      sciExpr += 'π';
    } else if (val === 'e') {
      sciExpr += 'e';
    } else if (val === 'C') {
      sciExpr = '';
    } else if (val === '=') {
      try {
        let result = evaluateSci(sciExpr);
        sciExpr = result.toString();
      } catch (e) {
        sciExpr = '';
        sciDisplay.value = 'Error';
        return;
      }
    } else if (val === 'sin' || val === 'cos' || val === 'tan' || val === 'ln' || val === 'log' || val === 'sqrt') {
      sciExpr += val + '(';
    } else if (val === '+/-') {
      if (sciExpr) {
        if (sciExpr.startsWith('-')) {
          sciExpr = sciExpr.substring(1);
        } else {
          sciExpr = '-' + sciExpr;
        }
      }
    } else if (val === '%') {
      if (sciExpr) {
        sciExpr = (parseFloat(sciExpr) / 100).toString();
      }
    } else {
      sciExpr += val;
    }
    sciDisplay.value = sciExpr;
  }
  function evaluateSci(expr) {
    expr = expr.replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E');
    expr = expr.replace(/sin\(/g, 'Math.sin(')
               .replace(/cos\(/g, 'Math.cos(')
               .replace(/tan\(/g, 'Math.tan(')
               .replace(/ln\(/g, 'Math.log(')
               .replace(/log\(/g, 'Math.log10(')
               .replace(/sqrt\(/g, 'Math.sqrt(');
    expr = expr.replace(/([0-9.eE\)\]]+)\s*\^\s*([0-9.eE\(\[]+)/g, 'Math.pow($1,$2)');
    return Function('return ' + expr)();
  }
  document.querySelectorAll('.sci-btn').forEach(btn => {
    btn.onclick = function() {
      insertSci(this.getAttribute('data-func'));
    };
  });
}

// --- All Calculation Functions (Algebra & Geometry) ---
function solveLinear() {
  let a = parseFloat(document.getElementById('lin-a').value);
  let b = parseFloat(document.getElementById('lin-b').value);
  let result = '';
  if (a === 0) {
    result = (b === 0) ? "Infinite solutions." : "No solution.";
  } else {
    result = `x = ${-b / a}`;
  }
  document.getElementById('lin-result').textContent = result;
}
function solveQuadratic() {
  let a = parseFloat(document.getElementById('quad-a').value);
  let b = parseFloat(document.getElementById('quad-b').value);
  let c = parseFloat(document.getElementById('quad-c').value);
  let d = b * b - 4 * a * c;
  let result = '';
  if (a === 0) {
    result = "Not a quadratic equation.";
  } else if (d > 0) {
    let r1 = (-b + Math.sqrt(d)) / (2 * a);
    let r2 = (-b - Math.sqrt(d)) / (2 * a);
    result = `Two real roots: x₁ = ${r1}, x₂ = ${r2}`;
  } else if (d === 0) {
    let r = -b / (2 * a);
    result = `One real root: x = ${r}`;
  } else {
    let real = (-b / (2 * a)).toFixed(3);
    let imag = (Math.sqrt(-d) / (2 * a)).toFixed(3);
    result = `Two complex roots: x₁ = ${real} + ${imag}i, x₂ = ${real} - ${imag}i`;
  }
  document.getElementById('quad-result').textContent = result;
}
function simplifyFraction() {
  let num = parseInt(document.getElementById('frac-num').value);
  let den = parseInt(document.getElementById('frac-den').value);
  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
  let g = gcd(Math.abs(num), Math.abs(den));
  let simpNum = num / g;
  let simpDen = den / g;
  let result = (simpDen === 1) ? `${simpNum}` : `${simpNum}/${simpDen}`;
  document.getElementById('frac-result').textContent = result;
}
function solveSystem() {
  let a1 = parseFloat(document.getElementById('sys-a1').value);
  let b1 = parseFloat(document.getElementById('sys-b1').value);
  let c1 = parseFloat(document.getElementById('sys-c1').value);
  let a2 = parseFloat(document.getElementById('sys-a2').value);
  let b2 = parseFloat(document.getElementById('sys-b2').value);
  let c2 = parseFloat(document.getElementById('sys-c2').value);
  let det = a1 * b2 - a2 * b1;
  let result = '';
  if (det === 0) {
    result = "No unique solution.";
  } else {
    let x = (c1 * b2 - c2 * b1) / det;
    let y = (a1 * c2 - a2 * c1) / det;
    result = `x = ${x}, y = ${y}`;
  }
  document.getElementById('sys-result').textContent = result;
}
function solveCubic() {
  let a = parseFloat(document.getElementById('cubic-a').value);
  let b = parseFloat(document.getElementById('cubic-b').value);
  let c = parseFloat(document.getElementById('cubic-c').value);
  let d = parseFloat(document.getElementById('cubic-d').value);
  let result = '';
  if (a === 0) {
    result = "Not a cubic equation.";
  } else {
    let p = (3*a*c - b*b) / (3*a*a);
    let q = (2*b*b*b - 9*a*b*c + 27*a*a*d) / (27*a*a*a);
    let discriminant = (q*q/4) + (p*p*p/27);
    let roots = [];
    if (discriminant > 0) {
      let u = Math.cbrt(-q/2 + Math.sqrt(discriminant));
      let v = Math.cbrt(-q/2 - Math.sqrt(discriminant));
      roots[0] = u + v - b/(3*a);
      result = `One real root: x = ${roots[0]}`;
    } else if (discriminant === 0) {
      let u = Math.cbrt(-q/2);
      roots[0] = 2*u - b/(3*a);
      roots[1] = -u - b/(3*a);
      result = `Multiple real roots: x₁ = ${roots[0]}, x₂ = x₃ = ${roots[1]}`;
    } else {
      let r = Math.sqrt(-p*p*p/27);
      let phi = Math.acos(-q/(2*r));
      let t = 2*Math.cbrt(r);
      roots[0] = t*Math.cos(phi/3) - b/(3*a);
      roots[1] = t*Math.cos((phi+2*Math.PI)/3) - b/(3*a);
      roots[2] = t*Math.cos((phi+4*Math.PI)/3) - b/(3*a);
      result = `Three real roots: x₁ = ${roots[0]}, x₂ = ${roots[1]}, x₃ = ${roots[2]}`;
    }
  }
  document.getElementById('cubic-result').textContent = result;
}
function simplifyRational() {
  let num = document.getElementById('rat-num').value.replace(/\s/g,'');
  let den = document.getElementById('rat-den').value.replace(/\s/g,'');
  let numVal = eval(num.replace(/x/g, '1'));
  let denVal = eval(den.replace(/x/g, '1'));
  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
  let g = gcd(Math.abs(numVal), Math.abs(denVal));
  let simpNum = numVal / g;
  let simpDen = denVal / g;
  let result = (simpDen === 1) ? `${simpNum}` : `${simpNum}/${simpDen}`;
  document.getElementById('rat-result').textContent = "Numeric simplification: " + result;
}
function calcExpRoot() {
  let base = parseFloat(document.getElementById('exproot-base').value);
  let exp = parseFloat(document.getElementById('exproot-exp').value);
  let result = Math.pow(base, exp);
  document.getElementById('exproot-result').textContent = `Result: ${result}`;
}
function sciNotation() {
  let num = parseFloat(document.getElementById('sci-num').value);
  let sci = num.toExponential();
  document.getElementById('sci-result').textContent = `Scientific notation: ${sci}`;
}
function sequenceCalc() {
  let type = document.getElementById('seq-type').value;
  let a1 = parseFloat(document.getElementById('seq-a1').value);
  let dr = parseFloat(document.getElementById('seq-dr').value);
  let n = parseInt(document.getElementById('seq-n').value);
  let nth, sum;
  if (type === 'arith') {
    nth = a1 + (n-1)*dr;
    sum = (n/2)*(2*a1 + (n-1)*dr);
    document.getElementById('seq-result').textContent = `aₙ = ${nth}, Sₙ = ${sum}`;
  } else {
    nth = a1 * Math.pow(dr, n-1);
    sum = a1 * (1 - Math.pow(dr, n)) / (1-dr);
    document.getElementById('seq-result').textContent = `aₙ = ${nth}, Sₙ = ${sum}`;
  }
}
function areaPerimeterCircle() {
  let r = parseFloat(document.getElementById('circle-radius').value);
  let area = Math.PI * r * r;
  let peri = 2 * Math.PI * r;
  document.getElementById('circle-result').textContent = `Area = ${area}, Perimeter = ${peri}`;
}
function areaPerimeterRectangle() {
  let l = parseFloat(document.getElementById('rect-l').value);
  let w = parseFloat(document.getElementById('rect-w').value);
  let area = l * w;
  let peri = 2 * (l + w);
  document.getElementById('rect-result').textContent = `Area = ${area}, Perimeter = ${peri}`;
}
function areaPerimeterSquare() {
  let s = parseFloat(document.getElementById('sq-side').value);
  let area = s * s;
  let peri = 4 * s;
  document.getElementById('sq-result').textContent = `Area = ${area}, Perimeter = ${peri}`;
}
function areaPerimeterParallelogram() {
  let b = parseFloat(document.getElementById('par-base').value);
  let h = parseFloat(document.getElementById('par-height').value);
  let s = parseFloat(document.getElementById('par-side').value);
  let area = b * h;
  let peri = 2 * (b + s);
  document.getElementById('par-result').textContent = `Area = ${area}, Perimeter = ${peri}`;
}
function areaPerimeterTrapezoid() {
  let b1 = parseFloat(document.getElementById('trap-b1').value);
  let b2 = parseFloat(document.getElementById('trap-b2').value);
  let h = parseFloat(document.getElementById('trap-h').value);
  let s1 = parseFloat(document.getElementById('trap-s1').value);
  let s2 = parseFloat(document.getElementById('trap-s2').value);
  let area = ((b1 + b2) / 2) * h;
  let peri = b1 + b2 + s1 + s2;
  document.getElementById('trap-result').textContent = `Area = ${area}, Perimeter = ${peri}`;
}
function areaPerimeterEllipse() {
  let a = parseFloat(document.getElementById('ell-a').value);
  let b = parseFloat(document.getElementById('ell-b').value);
  let area = Math.PI * a * b;
  let peri = Math.PI * (3*(a+b) - Math.sqrt((3*a+b)*(a+3*b))); // Ramanujan
  document.getElementById('ell-result').textContent = `Area = ${area}, Perimeter ≈ ${peri}`;
}
function volumeSphere() {
  let r = parseFloat(document.getElementById('sp-radius').value);
  let vol = (4/3) * Math.PI * Math.pow(r,3);
  document.getElementById('sp-result').textContent = `Volume = ${vol}`;
}
function volumeCylinder() {
  let r = parseFloat(document.getElementById('cyl-radius').value);
  let h = parseFloat(document.getElementById('cyl-h').value);
  let vol = Math.PI * r * r * h;
  document.getElementById('cyl-result').textContent = `Volume = ${vol}`;
}
function volumeCone() {
  let r = parseFloat(document.getElementById('cone-radius').value);
  let h = parseFloat(document.getElementById('cone-h').value);
  let vol = (1/3) * Math.PI * r * r * h;
  document.getElementById('cone-result').textContent = `Volume = ${vol}`;
}
function volumePrism() {
  let l = parseFloat(document.getElementById('prism-l').value);
  let w = parseFloat(document.getElementById('prism-w').value);
  let h = parseFloat(document.getElementById('prism-h').value);
  let vol = l * w * h;
  document.getElementById('prism-result').textContent = `Volume = ${vol}`;
}
function distance2Points() {
  let x1 = parseFloat(document.getElementById('dist-x1').value);
  let y1 = parseFloat(document.getElementById('dist-y1').value);
  let x2 = parseFloat(document.getElementById('dist-x2').value);
  let y2 = parseFloat(document.getElementById('dist-y2').value);
  let dist = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
  document.getElementById('dist-result').textContent = `Distance = ${dist}`;
}
function midpointCalc() {
  let x1 = parseFloat(document.getElementById('mid-x1').value);
  let y1 = parseFloat(document.getElementById('mid-y1').value);
  let x2 = parseFloat(document.getElementById('mid-x2').value);
  let y2 = parseFloat(document.getElementById('mid-y2').value);
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  document.getElementById('mid-result').textContent = `Midpoint = (${mx}, ${my})`;
}
function slopeCalc() {
  let x1 = parseFloat(document.getElementById('slope-x1').value);
  let y1 = parseFloat(document.getElementById('slope-y1').value);
  let x2 = parseFloat(document.getElementById('slope-x2').value);
  let y2 = parseFloat(document.getElementById('slope-y2').value);
  let m = (y2 - y1) / (x2 - x1);
  document.getElementById('slope-result').textContent = `Slope = ${m}`;
}
function areaTriangle() {
  let b = parseFloat(document.getElementById('tri-base').value);
  let h = parseFloat(document.getElementById('tri-height').value);
  let area = 0.5 * b * h;
  document.getElementById('triangle-result').textContent = `Area = ${area}`;
}
function pythagorean() {
  let a = parseFloat(document.getElementById('pyth-a').value);
  let b = parseFloat(document.getElementById('pyth-b').value);
  let c = Math.sqrt(a * a + b * b);
  document.getElementById('pyth-result').textContent = `c = ${c}`;
}

// --- AI Chat (Demo/Stub) ---
const chatMessages = document.getElementById('chat-messages');
const aiSend = document.getElementById('ai-send');
const userInput = document.getElementById('user-input');
if (aiSend) {
  aiSend.onclick = function() {
    let msg = userInput.value.trim();
    if (!msg) return;
    chatMessages.innerHTML += `<div><b>You:</b> ${msg}</div>`;
    setTimeout(() => {
      chatMessages.innerHTML += `<div><b>AI:</b> <i>(Math AI demo)</i> The answer to "${msg}" is <b>${Math.floor(Math.random()*100)}</b>.</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
    userInput.value = '';
  };
  userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') aiSend.click();
  });
}

// --- Initialize default calculators on load ---
showAlgebra('simple');
showGeometry('circle');
function sendFeedback(event) {
  event.preventDefault();
  const email = document.getElementById('feedback-email').value.trim();
  const message = document.getElementById('feedback-message').value.trim();
  const status = document.getElementById('feedback-status');
  // Simulate sending (replace with real backend if needed)
  status.textContent = "Sending...";
  setTimeout(() => {
    status.textContent = "Thank you for your feedback!";
    document.getElementById('feedback-form').reset();
  }, 900);
}
