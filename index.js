module.exports = function(positions, potential, dt = 0.01) {
  const r = new Float64Array(Array.from(positions));

  let fe = potential(r);

  function step() {
    for (let i = 0; i < r.length; i++) {
      r[i] += dt * fe.force[i];
    }
    fe = potential(r);
    return {
      positions: r,
      energy: fe.energy,
      force: fe.force
    };
  }

  return step;
};
