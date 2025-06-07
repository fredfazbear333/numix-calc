// Mode Switching
function showMode(mode) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mode-content').forEach(c => c.style.display = 'none');
  document.getElementById(mode).style.display = 'block';
  document.querySelector(`.mode-btn[data-mode="${mode}"]`)?.classList.add('active');
}
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => showMode(btn.dataset.mode));
});
document.getElementById('logo-link').onclick = () => showMode('home');

// Algebra Calculators
const algebraCalculators = {
    basic: `
        <h3>Basic Calculator</h3>
        <input type="text" id="basic-display" readonly>
        <div id="basic-buttons" class="calculator-grid"></div>
        <div id="basic-answer"></div>
    `,
    scientific: `
        <h3>Scientific Calculator</h3>
        <input type="text" id="sci-display" readonly>
        <div id="sci-buttons" class="calculator-grid" style="grid-template-columns:repeat(5,64px);"></div>
        <div id="sci-answer"></div>
    `,
    quadratic: `
        <h3>Quadratic Equation Solver</h3>
        <form id="quad-form">
            <label>a: <input type="number" id="quad-a" required></label>
            <label>b: <input type="number" id="quad-b" required></label>
            <label>c: <input type="number" id="quad-c" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="quad-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="quad-result"></div>
    `,
    linear: `
        <h3>Linear Equation Solver (ax + b = 0)</h3>
        <form id="linear-form">
            <label>a: <input type="number" id="linear-a" required></label>
            <label>b: <input type="number" id="linear-b" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="linear-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="linear-result"></div>
    `,
    inequality: `
        <h3>Inequality Solver</h3>
        <form id="ineq-form">
            <label>Enter inequality (e.g., 2*x-5 < 9): <input type="text" id="ineq-input" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="ineq-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="ineq-result"></div>
    `,
    system: `
        <h3>System of Equations (2x2)</h3>
        <form id="system-form">
            <label>Eq1: <input type="text" id="sys-eq1" placeholder="e.g. 2*x+3*y=8" required></label>
            <label>Eq2: <input type="text" id="sys-eq2" placeholder="e.g. x-2*y=3" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="system-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="system-result"></div>
    `,
    simplify: `
        <h3>Expression Simplifier</h3>
        <form id="simplify-form">
            <label>Expression: <input type="text" id="simplify-input" placeholder="e.g. (x+1)*(x+2)" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="simplify-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="simplify-result"></div>
    `,
    factor: `
        <h3>Factor Polynomial</h3>
        <form id="factor-form">
            <label>Polynomial: <input type="text" id="factor-input" placeholder="e.g. x^2-5*x+6" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="factor-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="factor-result"></div>
    `
};

// Geometry Calculators
const geometryCalculators = {
    pythagorean: `
        <h3>Pythagorean Theorem</h3>
        <form id="pythag-form">
            <label>a: <input type="number" id="pythag-a" required></label>
            <label>b: <input type="number" id="pythag-b" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="pythag-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="pythag-result"></div>
    `,
    "circle-area": `
        <h3>Circle Area & Circumference</h3>
        <form id="circle-form">
            <label>Radius: <input type="number" id="circle-radius" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="circle-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="circle-result"></div>
    `,
    "triangle-area": `
        <h3>Triangle Area</h3>
        <form id="triangle-form">
            <label>Base: <input type="number" id="tri-base" required></label>
            <label>Height: <input type="number" id="tri-height" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="triangle-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="tri-result"></div>
    `,
    rectangle: `
        <h3>Rectangle Area & Perimeter</h3>
        <form id="rect-form">
            <label>Length: <input type="number" id="rect-l" required></label>
            <label>Width: <input type="number" id="rect-w" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="rect-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="rect-result"></div>
    `,
    square: `
        <h3>Square Area & Perimeter</h3>
        <form id="square-form">
            <label>Side: <input type="number" id="square-s" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="square-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="square-result"></div>
    `,
    trapezoid: `
        <h3>Trapezoid Area</h3>
        <form id="trap-form">
            <label>Base 1: <input type="number" id="trap-b1" required></label>
            <label>Base 2: <input type="number" id="trap-b2" required></label>
            <label>Height: <input type="number" id="trap-h" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="trap-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="trap-result"></div>
    `,
    ellipse: `
        <h3>Ellipse Area</h3>
        <form id="ellipse-form">
            <label>Semi-major axis (a): <input type="number" id="ellipse-a" required></label>
            <label>Semi-minor axis (b): <input type="number" id="ellipse-b" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="ellipse-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="ellipse-result"></div>
    `,
    cube: `
        <h3>Cube Volume</h3>
        <form id="cube-form">
            <label>Side: <input type="number" id="cube-s" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="cube-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="cube-result"></div>
    `,
    sphere: `
        <h3>Sphere Volume</h3>
        <form id="sphere-form">
            <label>Radius: <input type="number" id="sphere-r" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="sphere-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="sphere-result"></div>
    `,
    cylinder: `
        <h3>Cylinder Volume</h3>
        <form id="cylinder-form">
            <label>Radius: <input type="number" id="cylinder-r" required></label>
            <label>Height: <input type="number" id="cylinder-h" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="cylinder-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="cylinder-result"></div>
    `,
    cone: `
        <h3>Cone Volume</h3>
        <form id="cone-form">
            <label>Radius: <input type="number" id="cone-r" required></label>
            <label>Height: <input type="number" id="cone-h" required></label>
            <div class="form-btn-row">
                <button type="submit" class="calc-btn">Solve</button>
                <button type="button" id="cone-clear" class="calc-btn clear-btn">Clear</button>
            </div>
        </form>
        <div id="cone-result"></div>
    `
};

// Helper: Render calculator
function renderCalculator(containerId, calculators, tool) {
    const container = document.getElementById(containerId);
    container.innerHTML = calculators[tool] || '';
    if (tool === 'basic') setupBasicCalculator();
    if (tool === 'scientific') setupScientificCalculator();
    if (tool === 'quadratic') setupQuadratic();
    if (tool === 'linear') setupLinear();
    if (tool === 'inequality') setupInequality();
    if (tool === 'system') setupSystem();
    if (tool === 'simplify') setupSimplify();
    if (tool === 'factor') setupFactor();
    if (tool === 'pythagorean') setupPythagorean();
    if (tool === 'circle-area') setupCircle();
    if (tool === 'triangle-area') setupTriangle();
    if (tool === 'rectangle') setupRectangle();
    if (tool === 'square') setupSquare();
    if (tool === 'trapezoid') setupTrapezoid();
    if (tool === 'ellipse') setupEllipse();
    if (tool === 'cube') setupCube();
    if (tool === 'sphere') setupSphere();
    if (tool === 'cylinder') setupCylinder();
    if (tool === 'cone') setupCone();
    // Sidebar highlight
    const sidebar = containerId === 'algebra-main' ? 'algebra-tools' : 'geometry-tools';
    document.querySelectorAll(`#${sidebar} .tool-item`).forEach(item => {
        item.classList.remove('active');
        if (item.dataset.tool === tool) item.classList.add('active');
    });
}

// Sidebar events
document.getElementById('algebra-tools').addEventListener('click', (e) => {
    if (e.target.classList.contains('tool-item')) {
        renderCalculator('algebra-main', algebraCalculators, e.target.dataset.tool);
    }
});
document.getElementById('geometry-tools').addEventListener('click', (e) => {
    if (e.target.classList.contains('tool-item')) {
        renderCalculator('geometry-main', geometryCalculators, e.target.dataset.tool);
    }
});

// Default calculators
renderCalculator('algebra-main', algebraCalculators, 'basic');
renderCalculator('geometry-main', geometryCalculators, 'pythagorean');

// Basic Calculator Logic with Clear
function setupBasicCalculator() {
    const display = document.getElementById('basic-display');
    const answerDiv = document.getElementById('basic-answer');
    const buttons = [
        '7','8','9','/',
        '4','5','6','*',
        '1','2','3','-',
        '0','.','=','+',
        'C'
    ];
    const btnsDiv = document.getElementById('basic-buttons');
    btnsDiv.innerHTML = '';
    let current = '';
    buttons.forEach(b => {
        const btn = document.createElement('button');
        btn.textContent = b;
        btn.className = 'calc-btn' + (b === 'C' ? ' clear-btn' : '');
        btn.type = 'button';
        btn.onclick = () => {
            if (b === 'C') {
                current = '';
                display.value = '';
                answerDiv.innerHTML = '';
            } else if (b === '=') {
                let result;
                try {
                    result = eval(current).toString();
                } catch {
                    result = 'Error';
                }
                animateAnswer(answerDiv, result);
                current = result === 'Error' ? '' : result;
            } else {
                current += b;
                answerDiv.innerHTML = '';
            }
            display.value = current;
        };
        btnsDiv.appendChild(btn);
    });
}

// Scientific Calculator Logic with Clear
function setupScientificCalculator() {
    const display = document.getElementById('sci-display');
    const answerDiv = document.getElementById('sci-answer');
    const buttons = [
        '7','8','9','/','sin',
        '4','5','6','*','cos',
        '1','2','3','-','tan',
        '0','.','=','+','^',
        'C'
    ];
    const btnsDiv = document.getElementById('sci-buttons');
    btnsDiv.innerHTML = '';
    let current = '';
    buttons.forEach(b => {
        const btn = document.createElement('button');
        btn.textContent = b;
        btn.className = 'calc-btn' + (b === 'C' ? ' clear-btn' : '');
        btn.type = 'button';
        btn.onclick = () => {
            if (b === 'C') {
                current = '';
                display.value = '';
                answerDiv.innerHTML = '';
            } else if (b === '=') {
                let result;
                try {
                    let expr = current.replace(/\^/g, '**');
                    expr = expr.replace(/sin\(([^)]+)\)/g, (_, x) => Math.sin(Number(x)));
                    expr = expr.replace(/cos\(([^)]+)\)/g, (_, x) => Math.cos(Number(x)));
                    expr = expr.replace(/tan\(([^)]+)\)/g, (_, x) => Math.tan(Number(x)));
                    result = eval(expr).toString();
                } catch {
                    result = 'Error';
                }
                animateAnswer(answerDiv, result);
                current = result === 'Error' ? '' : result;
            } else if(['sin','cos','tan'].includes(b)) {
                current += b + '(';
                answerDiv.innerHTML = '';
            } else {
                current += b;
                answerDiv.innerHTML = '';
            }
            display.value = current;
        };
        btnsDiv.appendChild(btn);
    });
}

// Quadratic Equation Solver with Clear
function setupQuadratic() {
    document.getElementById('quad-form').onsubmit = function(e) {
        e.preventDefault();
        const a = parseFloat(document.getElementById('quad-a').value);
        const b = parseFloat(document.getElementById('quad-b').value);
        const c = parseFloat(document.getElementById('quad-c').value);
        const delta = b*b - 4*a*c;
        let result;
        if (delta < 0) result = 'No real roots';
        else if (delta === 0) result = `One root: x = ${-b/(2*a)}`;
        else result = `Roots: x₁ = ${(-b + Math.sqrt(delta))/(2*a)}, x₂ = ${(-b - Math.sqrt(delta))/(2*a)}`;
        animateAnswer(document.getElementById('quad-result'), result);
    };
    document.getElementById('quad-clear').onclick = function() {
        document.getElementById('quad-form').reset();
        document.getElementById('quad-result').innerHTML = '';
    };
}

// Linear Equation Solver with Clear
function setupLinear() {
    document.getElementById('linear-form').onsubmit = function(e) {
        e.preventDefault();
        const a = parseFloat(document.getElementById('linear-a').value);
        const b = parseFloat(document.getElementById('linear-b').value);
        let result;
        if (a === 0) {
            result = 'No solution (a cannot be zero)';
        } else {
            result = `x = ${-b/a}`;
        }
        animateAnswer(document.getElementById('linear-result'), result);
    };
    document.getElementById('linear-clear').onclick = function() {
        document.getElementById('linear-form').reset();
        document.getElementById('linear-result').innerHTML = '';
    };
}

// Inequality Solver (using math.js)
function setupInequality() {
    document.getElementById('ineq-form').onsubmit = function(e) {
        e.preventDefault();
        const ineq = document.getElementById('ineq-input').value;
        let result = "";
        try {
            // Only handles simple inequalities with one variable, e.g., "2*x-5 < 9"
            // We'll solve for x numerically
            const match = ineq.match(/(.+?)(<=|>=|<|>)(.+)/);
            if (match) {
                const left = match[1].trim();
                const op = match[2];
                const right = match[3].trim();
                // Rearrange to left - right < 0, then solve
                const expr = `(${left}) - (${right})`;
                // Try to find the root numerically
                let x = 0, found = false;
                for (let i = -1000; i <= 1000; i += 0.01) {
                    const scope = {x: i};
                    const val = math.evaluate(expr, scope);
                    if (
                        (op === "<" && val < 0) ||
                        (op === ">" && val > 0) ||
                        (op === "<=" && val <= 0) ||
                        (op === ">=" && val >= 0)
                    ) {
                        result = `x ${op} ${i.toFixed(2)}`;
                        found = true;
                        break;
                    }
                }
                if (!found) result = "No solution found (demo: only works for simple inequalities)";
            } else {
                result = "Please enter a simple inequality like '2*x-5 < 9'";
            }
        } catch (err) {
            result = "Error: " + err.message;
        }
        animateAnswer(document.getElementById('ineq-result'), result);
    };
    document.getElementById('ineq-clear').onclick = function() {
        document.getElementById('ineq-form').reset();
        document.getElementById('ineq-result').innerHTML = '';
    };
}

// System of Equations (2x2, using math.js)
function setupSystem() {
    document.getElementById('system-form').onsubmit = function(e) {
        e.preventDefault();
        const eq1 = document.getElementById('sys-eq1').value;
        const eq2 = document.getElementById('sys-eq2').value;
        let result = "";
        try {
            // Accepts equations like "2*x+3*y=8"
            const parseEq = eq => {
                const [lhs, rhs] = eq.split('=');
                return math.simplify(lhs + "-(" + rhs + ")").toString();
            };
            const expr1 = parseEq(eq1);
            const expr2 = parseEq(eq2);
            const solutions = math.solve([expr1, expr2], ['x', 'y']);
            if (solutions && solutions.x !== undefined && solutions.y !== undefined) {
                result = `x = ${solutions.x}, y = ${solutions.y}`;
            } else {
                result = "No unique solution found.";
            }
        } catch (err) {
            result = "Error: " + err.message;
        }
        animateAnswer(document.getElementById('system-result'), result);
    };
    document.getElementById('system-clear').onclick = function() {
        document.getElementById('system-form').reset();
        document.getElementById('system-result').innerHTML = '';
    };
}

// Simplify Expression (using math.js)
function setupSimplify() {
    document.getElementById('simplify-form').onsubmit = function(e) {
        e.preventDefault();
        const expr = document.getElementById('simplify-input').value;
        let result = "";
        try {
            result = math.simplify(expr).toString();
        } catch (err) {
            result = "Error: " + err.message;
        }
        animateAnswer(document.getElementById('simplify-result'), `Simplified: ${result}`);
    };
    document.getElementById('simplify-clear').onclick = function() {
        document.getElementById('simplify-form').reset();
        document.getElementById('simplify-result').innerHTML = '';
    };
}

// Factor Polynomial (using math.js)
function setupFactor() {
    document.getElementById('factor-form').onsubmit = function(e) {
        e.preventDefault();
        const poly = document.getElementById('factor-input').value;
        let result = "";
        try {
            result = math.factor(poly).toString();
        } catch (err) {
            result = "Error: " + err.message;
        }
        animateAnswer(document.getElementById('factor-result'), `Factored: ${result}`);
    };
    document.getElementById('factor-clear').onclick = function() {
        document.getElementById('factor-form').reset();
        document.getElementById('factor-result').innerHTML = '';
    };
}

// Pythagorean Theorem with Clear
function setupPythagorean() {
    document.getElementById('pythag-form').onsubmit = function(e) {
        e.preventDefault();
        const a = parseFloat(document.getElementById('pythag-a').value);
        const b = parseFloat(document.getElementById('pythag-b').value);
        const c = Math.sqrt(a*a + b*b);
        animateAnswer(document.getElementById('pythag-result'), `c = ${c}`);
    };
    document.getElementById('pythag-clear').onclick = function() {
        document.getElementById('pythag-form').reset();
        document.getElementById('pythag-result').innerHTML = '';
    };
}

// Circle Area & Circumference with Clear
function setupCircle() {
    document.getElementById('circle-form').onsubmit = function(e) {
        e.preventDefault();
        const r = parseFloat(document.getElementById('circle-radius').value);
        const area = Math.PI * r * r;
        const circ = 2 * Math.PI * r;
        animateAnswer(document.getElementById('circle-result'), `Area: ${area.toFixed(2)}, Circumference: ${circ.toFixed(2)}`);
    };
    document.getElementById('circle-clear').onclick = function() {
        document.getElementById('circle-form').reset();
        document.getElementById('circle-result').innerHTML = '';
    };
}

// Triangle Area with Clear
function setupTriangle() {
    document.getElementById('triangle-form').onsubmit = function(e) {
        e.preventDefault();
        const base = parseFloat(document.getElementById('tri-base').value);
        const height = parseFloat(document.getElementById('tri-height').value);
        const area = 0.5 * base * height;
        animateAnswer(document.getElementById('tri-result'), `Area: ${area}`);
    };
    document.getElementById('triangle-clear').onclick = function() {
        document.getElementById('triangle-form').reset();
        document.getElementById('tri-result').innerHTML = '';
    };
}

// Rectangle Area & Perimeter with Clear
function setupRectangle() {
    document.getElementById('rect-form').onsubmit = function(e) {
        e.preventDefault();
        const l = parseFloat(document.getElementById('rect-l').value);
        const w = parseFloat(document.getElementById('rect-w').value);
        const area = l * w;
        const peri = 2 * (l + w);
        animateAnswer(document.getElementById('rect-result'), `Area: ${area}, Perimeter: ${peri}`);
    };
    document.getElementById('rect-clear').onclick = function() {
        document.getElementById('rect-form').reset();
        document.getElementById('rect-result').innerHTML = '';
    };
}

// Square Area & Perimeter with Clear
function setupSquare() {
    document.getElementById('square-form').onsubmit = function(e) {
        e.preventDefault();
        const s = parseFloat(document.getElementById('square-s').value);
        const area = s * s;
        const peri = 4 * s;
        animateAnswer(document.getElementById('square-result'), `Area: ${area}, Perimeter: ${peri}`);
    };
    document.getElementById('square-clear').onclick = function() {
        document.getElementById('square-form').reset();
        document.getElementById('square-result').innerHTML = '';
    };
}

// Trapezoid Area with Clear
function setupTrapezoid() {
    document.getElementById('trap-form').onsubmit = function(e) {
        e.preventDefault();
        const b1 = parseFloat(document.getElementById('trap-b1').value);
        const b2 = parseFloat(document.getElementById('trap-b2').value);
        const h = parseFloat(document.getElementById('trap-h').value);
        const area = 0.5 * (b1 + b2) * h;
        animateAnswer(document.getElementById('trap-result'), `Area: ${area}`);
    };
    document.getElementById('trap-clear').onclick = function() {
        document.getElementById('trap-form').reset();
        document.getElementById('trap-result').innerHTML = '';
    };
}

// Ellipse Area with Clear
function setupEllipse() {
    document.getElementById('ellipse-form').onsubmit = function(e) {
        e.preventDefault();
        const a = parseFloat(document.getElementById('ellipse-a').value);
        const b = parseFloat(document.getElementById('ellipse-b').value);
        const area = Math.PI * a * b;
        animateAnswer(document.getElementById('ellipse-result'), `Area: ${area.toFixed(2)}`);
    };
    document.getElementById('ellipse-clear').onclick = function() {
        document.getElementById('ellipse-form').reset();
        document.getElementById('ellipse-result').innerHTML = '';
    };
}

// Cube Volume with Clear
function setupCube() {
    document.getElementById('cube-form').onsubmit = function(e) {
        e.preventDefault();
        const s = parseFloat(document.getElementById('cube-s').value);
        const vol = s * s * s;
        animateAnswer(document.getElementById('cube-result'), `Volume: ${vol}`);
    };
    document.getElementById('cube-clear').onclick = function() {
        document.getElementById('cube-form').reset();
        document.getElementById('cube-result').innerHTML = '';
    };
}

// Sphere Volume with Clear
function setupSphere() {
    document.getElementById('sphere-form').onsubmit = function(e) {
        e.preventDefault();
        const r = parseFloat(document.getElementById('sphere-r').value);
        const vol = (4/3) * Math.PI * Math.pow(r, 3);
        animateAnswer(document.getElementById('sphere-result'), `Volume: ${vol.toFixed(2)}`);
    };
    document.getElementById('sphere-clear').onclick = function() {
        document.getElementById('sphere-form').reset();
        document.getElementById('sphere-result').innerHTML = '';
    };
}

// Cylinder Volume with Clear
function setupCylinder() {
    document.getElementById('cylinder-form').onsubmit = function(e) {
        e.preventDefault();
        const r = parseFloat(document.getElementById('cylinder-r').value);
        const h = parseFloat(document.getElementById('cylinder-h').value);
        const vol = Math.PI * r * r * h;
        animateAnswer(document.getElementById('cylinder-result'), `Volume: ${vol.toFixed(2)}`);
    };
    document.getElementById('cylinder-clear').onclick = function() {
        document.getElementById('cylinder-form').reset();
        document.getElementById('cylinder-result').innerHTML = '';
    };
}

// Cone Volume with Clear
function setupCone() {
    document.getElementById('cone-form').onsubmit = function(e) {
        e.preventDefault();
        const r = parseFloat(document.getElementById('cone-r').value);
        const h = parseFloat(document.getElementById('cone-h').value);
        const vol = (1/3) * Math.PI * r * r * h;
        animateAnswer(document.getElementById('cone-result'), `Volume: ${vol.toFixed(2)}`);
    };
    document.getElementById('cone-clear').onclick = function() {
        document.getElementById('cone-form').reset();
        document.getElementById('cone-result').innerHTML = '';
    };
}

// Animated answer display
function animateAnswer(container, text) {
    container.innerHTML = `<div class="animated-answer">${text}</div>`;
}

// AI Chatbot (Demo)
document.getElementById('ai-send').onclick = handleAIQuery;
document.getElementById('user-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') handleAIQuery();
});
function handleAIQuery() {
  const userInput = document.getElementById('user-input').value.trim();
  if (!userInput) return;
  const chat = document.getElementById('chat-messages');
  chat.innerHTML += `<div><b>You:</b> ${userInput}</div>`;
  document.getElementById('user-input').value = '';
  chat.scrollTop = chat.scrollHeight;
  setTimeout(() => {
    let response = "I'm Numix AI! I can help with math. Try asking about algebra or geometry.";
    chat.innerHTML += `<div><b>Numix AI:</b> ${response}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }, 700);
}

// Show home by default
showMode('home');