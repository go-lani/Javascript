class Base {
  constructor() {
    console.log(new.target);
    console.log(this instanceof Object);
    console.log(this instanceof Base);
    console.log(this instanceof Derived);
  }
}

class Derived extends Base {
  // constructor() { super(); }
}

const derived = new Derived();