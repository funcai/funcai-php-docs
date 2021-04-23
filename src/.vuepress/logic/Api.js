export default {
  post(url, body) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    return new Promise((resolve, reject) => {
      fetch(this.getURL(url), {
        body: JSON.stringify(body),
        headers,
        method: 'POST',
      }).then(
        (response) => {
          if (!response.ok) {
            reject()
            return
          }
          response
            .json()
            .then(resolve)
            .catch(reject)
        },
        (error) => {
          reject(error)
        },
      )
    })
  },
  get(url) {
    const headers = {
      'Accept': 'application/json',
    }
    return new Promise((resolve, reject) => {
      fetch(this.getURL(url), {
        headers,
        method: 'GET',
      }).then(
        (response) => {
          if (!response.ok) {
            reject()
            return
          }
          response
            .json()
            .then(resolve)
            .catch(reject)
        },
        (error) => {
          reject(error)
        },
      )
    })
  },
  getURL(url) {
    return API_URL + url
  }
}