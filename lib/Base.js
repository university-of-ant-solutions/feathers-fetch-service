const query = require('qs')
// const { convert } = require('@feathersjs/errors')

// Removes all leading and trailing slashes from a path
function stripSlashes(name) {
  return name.replace(/^(\/*)|(\/*)$/g, '')
}

function toError(error) {
  // throw convert(error)
  throw error
}

class Base {
  constructor(settings) {
    this.name = stripSlashes(settings.name)
    this.options = settings.options
    this.connection = settings.connection
    if (this.name && this.name !== '') {
      this.base = `${settings.base}/${this.name}`
    } else {
      this.base = settings.base
    }
  }

  makeUrl(params, id) {
    params = params || {} // eslint-disable-line no-param-reassign
    let url = this.base

    if (typeof id !== 'undefined' && id !== null) {
      url += `/${id}`
    }

    if (Object.keys(params).length !== 0) {
      const queryString = query.stringify(params, { encode: false })
      url += `?${queryString}`
    }
    // console.log(url)
    return url
  }

  find(params = {}, id) {
    return this.request({
      url: this.makeUrl(params.query, id),
      method: 'GET',
      headers: Object.assign({}, params.headers),
    }).catch(toError)
  }

  get(id, params = {}) {
    if (typeof id === 'undefined') {
      return Promise.reject(new Error('id for \'get\' can not be undefined'))
    }

    return this.request({
      url: this.makeUrl(params.query, id),
      method: 'GET',
      headers: Object.assign({}, params.headers),
    }).catch(toError)
  }

  create(body, params = {}, id) {
    return this.request({
      url: this.makeUrl(params.query, id),
      body,
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, params.headers),
    }).catch(toError)
  }

  update(id, body, params = {}) {
    if (typeof id === 'undefined') {
      return Promise.reject(new Error('id for \'update\' can not be undefined, only \'null\' when updating multiple entries'))
    }

    return this.request({
      url: this.makeUrl(params.query, id),
      body,
      method: 'PUT',
      headers: Object.assign({ 'Content-Type': 'application/json' }, params.headers),
    }).catch(toError)
  }

  patch(id, body, params = {}) {
    if (typeof id === 'undefined') {
      return Promise.reject(new Error('id for \'patch\' can not be undefined, only \'null\' when updating multiple entries'))
    }

    return this.request({
      url: this.makeUrl(params.query, id),
      body,
      method: 'PATCH',
      headers: Object.assign({ 'Content-Type': 'application/json' }, params.headers),
    }).catch(toError)
  }

  remove(id, params = {}) {
    if (typeof id === 'undefined') {
      return Promise.reject(new Error('id for \'remove\' can not be undefined, only \'null\' when removing multiple entries'))
    }

    return this.request({
      url: this.makeUrl(params.query, id),
      method: 'DELETE',
      headers: Object.assign({}, params.headers),
    }).catch(toError)
  }
}

export default Base
