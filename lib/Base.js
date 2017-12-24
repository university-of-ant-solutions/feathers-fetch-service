import query from 'qs'
import isObject from 'lodash.isobject'
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

  makeUrl(params = {}, id) {
    let url = this.base

    if (typeof id !== 'undefined' && id !== null) {
      url += `/${id}`
    }

    if (Object.keys(params).length !== 0) {
      const queryString = query.stringify(params, { encode: false })
      url += `?${queryString}`
    }
    return url
  }

  find(id, params = {}) {
    let path = id
    let options = params
    if (isObject(path)) {
      options = path
      path = null
    }
    return this.request({
      url: this.makeUrl(options.query, path),
      method: 'GET',
      headers: Object.assign({}, options.headers),
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

  create(id, body, params = {}) {
    let path = id
    let data = body
    let options = params
    if (isObject(path)) {
      data = path
      options = body
      path = null
    }

    return this.request({
      url: this.makeUrl(options.query, path),
      body: data,
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, options.headers),
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
