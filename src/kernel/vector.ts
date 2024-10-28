import { isEqual } from "./core";

export class Vector {
  coords: number[] = [];

  // Overloaded signatures

  constructor(_coords: number[]);

  // Implementation

  constructor(_coords: number[]) {
    this.coords = _coords;
  }

  get_x(): number {
    return this.coords[0];
  }

  get_y(): number {
    return this.coords[1];
  }

  get_z(): number {
    if (this.coords.length === 2) return 0;
    return this.coords[2];
  }

  equals(vector: Vector): boolean {
    if (this.coords.length !== vector.coords.length) return false;

    for (let i = 0; i < this.coords.length; i++) {
      if (isEqual(this.coords[i], vector.coords[i]) === false) {
        return false;
      }
    }

    return true;
  }

  notEquals(vector: Vector): boolean {
    return !this.equals(vector);
  }

  add(vector: Vector): Vector {
    const newCoords: number[] = [];

    for (let i = 0; i < this.coords.length; i++) {
      newCoords.push(this.coords[i] + vector.coords[i]);
    }

    return new Vector(newCoords);
  }

  multiply(amount: number): Vector {
    const newCoords: number[] = [];
    for (let i = 0; i < this.coords.length; i++) {
      const c = this.coords[i] * amount;
      newCoords.push(c);
    }

    return new Vector(newCoords);
  }

  subtract(vector: Vector): Vector {
    const newCoords: number[] = [];

    for (let i = 0; i < this.coords.length; i++) {
      newCoords.push(this.coords[i] - vector.coords[i]);
    }
    return new Vector(newCoords);
  }

  isLessThan(vector: Vector): boolean {
    for (let i = 0; i < this.coords.length; i++) {
      if (this.coords[i] < vector.coords[i]) return true;
      else if (this.coords[i] > vector.coords[i]) return false;
    }
    return false;
  }

  isGreateThan(vector: Vector): boolean {
    for (let i = 0; i < this.coords.length; i++) {
      if (this.coords[i] > vector.coords[i]) return true;
      else if (this.coords[i] < vector.coords[i]) return false;
    }
    return false;
  }

  indexOf(index: number): number {
    if (index >= this.coords.length) throw new Error("index out of bounds.");

    return this.coords[index];
  }

  assign(index: number, coord: number): void {
    if (index >= this.coords.length) throw new Error("index out of bounds.");

    this.coords[index] = coord;
  }

  magnitudeSquare(): number {
    let result = 0;

    for (let i = 0; i < this.coords.length; i++) {
      result += Math.pow(this.coords[i], 2);
    }

    return result;
  }

  magnitude(): number {
    return Math.sqrt(this.magnitudeSquare());
  }

  normalize(): void {
    const magnitude = this.magnitude();

    for (let i = 0; i < this.coords.length; i++) {
      this.assign(i, this.coords[i] / magnitude);
    }
  }

  squareDistanceTo(vector: Vector): number {
    let squareDist = 0;
    for (let i = 0; i < this.coords.length; i++) {
      squareDist += Math.pow(this.coords[i] - vector.coords[i], 2);
    }
    return squareDist;
  }
}

export const dotProduct = (v1: Vector, v2: Vector): number => {
  if (v1.coords.length !== v2.coords.length)
    throw new Error("vectors must have same dimensions for dor product.");

  let product = 0;

  for (let i = 0; i < v1.coords.length; i++) {
    product += v1.coords[i] * v2.coords[i];
  }

  return product;
};

export const crossProduct2D = (v1: Vector, v2: Vector): number => {
  return v1.coords[0] * v2.coords[1] - v1.coords[1] * v2.coords[0];
};

export const crossProduct3D = (v1: Vector, v2: Vector): Vector => {
  const x = v1.coords[1] * v2.coords[2] - v1.coords[2] * v2.coords[1];
  const y = -(v2.coords[2] * v1.coords[0] - v1.coords[2] * v2.coords[0]);
  const z = v1.coords[0] * v2.coords[1] - v2.coords[0] * v1.coords[1];

  return new Vector([x, y, z]);
};
