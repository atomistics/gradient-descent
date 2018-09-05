# gradient-descent

Given a set of atomic positions and a potential energy calculator, provides a function that steps in the direction of
the force.

```
npm i --save @atomistics/gradient-descent
``` 

## Example

```js
const LJ = require('@atomistics/lennard-jones-pairwise-js');
const pairwisePotential = require('@atomistics/pairwise-potential');
const gradientDescent = require('@atomistics/gradient-descent');

// Create a generic LJ potential.
const ljp = pairwisePotential(LJ());

// Initialize gradient descent with a particle at the origin and at 1.2 along x,
// our Lennard-Jones potential, and a timestep of 0.01.
const step = gradientDescent([0,0,0, 1.2,0,0], ljp, 0.01);

// Take ten steps, printing the energy and force at each step.
for (let i = 0; i < 10; i++) {
  const rfe = step();
  console.log(rfe.energy.toFixed(4), norm(rfe.force).toFixed(4));
}

/*  
    Prints the following:
    -0.6639 3.5784
    -0.7973 3.8020
    -0.9332 3.0937
    -0.9982 0.6909
    -0.9998 0.2555
    -1.0000 0.1175
    -1.0000 0.0505
    -1.0000 0.0224
    -1.0000 0.0098
    -1.0000 0.0043    
*/
```

## API

```js
const gradientDescent = require('@atomistics/gradient-descent');
const step = gradientDescent(positions, potential, timestep);
```

| Parameter | Type        | Description                             |
|-----------|-------------|-----------------------------------------|
| positions | float array | An flat array of atomic positions in 3D |
| potential | function    | A potential energy function             |

| Option   | Type  | Default | Description                                                                                                      |
|----------|-------|---------|------------------------------------------------------------------------------------------------------------------|
| timestep | float | 0.01    | The coefficient by which the force is multiplied when calculating a distance to step along the negative gradient |

Returns a function that when invoked performs a single iteration of the gradient descent algorithm. An internal state is
maintained to track the progress of the algorithm.

```js
const result = step();
```
Returns an object containing the updated energy, force, and positions of the system.

| Name             | Type        | Description                                                |
|------------------|-------------|------------------------------------------------------------|
| result.energy    | float       | The energy of the system as of the most recent step        |
| result.force     | float array | A flat array of forces on each component of the system     |
| result.positions | float array | A flat array of the updated atomic positions of the system |
