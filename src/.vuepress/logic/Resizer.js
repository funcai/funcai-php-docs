const pica = require('pica')()

export default {
    resize(input, width, height) {
        var canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        return pica.resize(input, canvas)
          .then(result => console.log(result))
    }
}
