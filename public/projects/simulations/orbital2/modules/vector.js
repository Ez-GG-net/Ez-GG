class Vector2D {
    constructor(x, y) {
      if (Array.isArray(x)) {
        // If the first argument is an array
        this.x = x[0];
        this.y = x[1];
        this[0] = x[0]; // Allow access as Vector[0]
        this[1] = x[1]; // Allow access as Vector[1]
      } else if (typeof x === 'object' && x !== null && 'x' in x && 'y' in x) {
        // If the first argument is an object with x and y properties
        this.x = x.x;
        this.y = x.y;
        this[0] = x.x;
        this[1] = x.y;
      } else if (typeof x === 'number' && typeof y === 'number') {
        // If both arguments are numbers
        this.x = x;
        this.y = y;
        this[0] = x;
        this[1] = y;  // Corrected here
      } else {
        throw new TypeError('Invalid input. Expected (x, y), an object with x and y, or an array [x, y]');
      }
    }
  
    // Add a number, vector, object, or array
    add(other) {
      if (other instanceof Vector) {
        this.x += other.x;
        this.y += other.y;
      } else if (typeof other === 'number') {
        this.x += other;
        this.y += other;
      } else if (Array.isArray(other)) {
        this.x += other[0];
        this.y += other[1];
      } else if (typeof other === 'object' && other !== null && 'x' in other && 'y' in other) {
        this.x += other.x;
        this.y += other.y;
      } else {
        throw new TypeError('Argument must be a number, an instance of Vector, an array [x, y], or an object with x and y');
      }
      // Also update the array-like values after adding
      this[0] = this.x;
      this[1] = this.y;
      return this;
    }
  
    // Subtract a number, vector, object, or array
    subtract(other) {
      if (other instanceof Vector) {
        this.x -= other.x;
        this.y -= other.y;
      } else if (typeof other === 'number') {
        this.x -= other;
        this.y -= other;
      } else if (Array.isArray(other)) {
        this.x -= other[0];
        this.y -= other[1];
      } else if (typeof other === 'object' && other !== null && 'x' in other && 'y' in other) {
        this.x -= other.x;
        this.y -= other.y;
      } else {
        throw new TypeError('Argument must be a number, an instance of Vector, an array [x, y], or an object with x and y');
      }
      // Also update the array-like values after subtracting
      this[0] = this.x;
      this[1] = this.y;
      return this;
    }
  
    // Multiply by a scalar
    multiply(scalar) {
      if (typeof scalar === 'number') {
        this.x *= scalar;
        this.y *= scalar;
      } else {
        throw new TypeError('Argument must be a number');
      }
      // Update array-like values after multiplication
      this[0] = this.x;
      this[1] = this.y;
      return this;
    }
  
    // Divide by a scalar
    divide(scalar) {
      if (typeof scalar === 'number' && scalar !== 0) {
        this.x /= scalar;
        this.y /= scalar;
      } else {
        throw new TypeError('Argument must be a non-zero number');
      }
      // Update array-like values after division
      this[0] = this.x;
      this[1] = this.y;
      return this;
    }
  
    // Compute the magnitude of the vector
    magnitude() {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
  
    // Return a string representation of the vector
    toString() {
      return `Vector(${this.x}, ${this.y})`;
    }
  }
  