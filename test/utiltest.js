'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

/**
 * Perform an async/await HTTP request
 * @param {string}route
 * @param {?object}header
 * @param {?object}body
 */
const getChaiHttp = async (route, header, body) => {
  return callRoute(route, header, body)
}

/**
 * Perform async/await get or post
 * @param route
 * @param header
 * @param body
 * @return {Promise}
 */
const callRoute = async (route, header, body) => {
  return new Promise(function (resolve, reject) {
    header = header || {}
    if (!body) {
      // console.log("PETICION GET!",header);
      chai.request('http://localhost:8081')
        .get(route)
        .set(header)
        .end(function (err, res) {
          if (err) reject(err)
          resolve(res)
        })
    } else {
      // console.log("PETICION POST!");
      chai.request('http://localhost:8081')
        .post(route)
        .set(header)
        .send(body)
        .end((err, res) => {
          if (err) reject(err)
          resolve(res)
        })
    }
  })
}

module.exports = getChaiHttp
