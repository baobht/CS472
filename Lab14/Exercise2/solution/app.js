import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getNumbers(req) {
  let a = req.params.a || req.query.a || req.body.a;
  let b = req.params.b || req.query.b || req.body.b;
  a = parseFloat(a);
  b = parseFloat(b);
  if (isNaN(a) || isNaN(b)) {
    return { error: "Invalid numbers provided" };
  }
  return { a, b };
}

function createRoute(operator, operation) {
  app.get(`/${operator}/:a/:b`, (req, res) => {
    const { a, b, error } = { ...getNumbers(req), ...{ error: null } };
    if (error) return res.status(400).json({ error });
    res.json({ results: operation(a, b) });
  });

  app.get(`/${operator}`, (req, res) => {
    const { a, b, error } = { ...getNumbers(req), ...{ error: null } };
    if (error) return res.status(400).json({ error });
    res.json({ results: operation(a, b) });
  });

  app.post(`/${operator}`, (req, res) => {
    const { a, b, error } = { ...getNumbers(req), ...{ error: null } };
    if (error) return res.status(400).json({ error });
    res.json({ results: operation(a, b) });
  });
}

createRoute("addition", (a, b) => a + b);
createRoute("subtraction", (a, b) => a - b);
createRoute("multiplication", (a, b) => a * b);
createRoute("division", (a, b) => (b !== 0 ? a / b : "Cannot divide by zero"));
createRoute("modulus", (a, b) => (b !== 0 ? a % b : "Cannot modulo by zero"));

app.listen(port, () => {
  console.log(`Calculator API running at http://localhost:${port}`);
});
