class Task {
  constructor(id, name, type, url) {
    this._id = id
    this._name = name
    this._type = type
    this._url = url
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get type() {
    return this._type
  }

  get url() {
    return this._url
  }
}

module.exports = Task
