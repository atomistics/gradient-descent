const fs = require("fs");
const test = require("tape");

const LJ = require("@atomistics/lennard-jones-pairwise-js");
const pairwisePotential = require("@atomistics/pairwise-potential");
const gradientDescent = require("../index");

test("optimization", t => {
  const data = JSON.parse(
    fs.readFileSync(__dirname + "/test-data.json", "utf-8")
  );

  const ljp = pairwisePotential(LJ());
  const step = gradientDescent(data.input, ljp, 0.01);

  function norm(a) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * a[i];
    }
    return Math.sqrt(sum);
  }

  output = [];

  for (let i = 0; i < 10; i++) {
    const rfe = step();
    output.push(
      JSON.parse(
        JSON.stringify({
          r: Array.from(rfe.positions),
          f: Array.from(rfe.force),
          e: rfe.energy
        })
      )
    );
  }

  t.same(output, data.output);
  t.end();
});
