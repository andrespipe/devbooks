class MyEs6Class {
  _id;
  #privateProp;
  prop;

  constructor(id, prop) {
    this._id = id;
    this.prop = prop;
  }

  get id() {
    return this._id;
  }
}
