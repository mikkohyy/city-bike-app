class MockResponse {
  statusValue: unknown
  jsonValue: unknown
  constructor() {
    this.statusValue = null
    this.jsonValue = null
  }

  status(statusCode: unknown) {
    this.statusValue = statusCode
    return this
  }

  json(object: unknown) {
    this.jsonValue = object
    return this
  }
}

class MockRequest {
  body: unknown
  query: unknown
  constructor(data: unknown, parameters: unknown) {
    this.body = data
    this.query = parameters
  }
}

export { MockResponse, MockRequest }
