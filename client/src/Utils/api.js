import axios from 'axios'
const urlsMap = new Map()

urlsMap.set('base', 'http://localhost:5000')
urlsMap.set('google', 'https://www.googleapis.com')

/**
 *
 */
class API {
  constructor (options) {
    const { resource, source } = options
    this.resource = resource
    this.baseInstance = axios.create({
      baseURL: urlsMap.get(source)
    })
  }

  async fetchData () {
    try {
      const response = await this.baseInstance.get(this.resource)
      return {
        ...response
      }
    } catch (error) {
      return {
        error,
        message: 'Failed to fetch data'
      }
    }
  }

  async postData (data) {
    try {
      console.log(data)
      const response = await this.baseInstance.post(`http://localhost:5000${this.resource}`, data)
      const { data: { responseBody } } = response
      return {
        ...responseBody
      }
    } catch (error) {
      console.log(error)
      return {
        error,
        message: 'Failed to post data'
      }
    }
  }

  async customPost (endpoint, data) {
    try {
      return await axios.post(endpoint)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default API
