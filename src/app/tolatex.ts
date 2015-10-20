import {Pipe, PipeTransform} from 'angular2/angular2'

@Pipe({ name: "tolatex" })
export class ToLatex implements PipeTransform {
  convert(text, fs, rs, precision, firstHeader) {
      function isNumber(x) {
          var y = x.match(/[0-9.]+/g)
          if (y !== null && y.length === 1 && y[0].length === x.length && x !== '.') {
              return true
          } else {
              return false
          }
      }

      var workingText = text
      // Fix line endings
      workingText = workingText.replace(/\r\n|\r/g, "\n")
      var records = workingText.split(rs)
      var fields = records.map(function(a) {
          return a.split(fs)
      })

      var numColumns = fields[0].length

      // fields.map(function(a) {
      //     if (a.length !== numColumns) {
      //         throw new Error("The number of columns must be the same in every row")
      //     }
      // })

      var columnCentered = ''
      while (numColumns--) {
          columnCentered += 'c'
      }
      var precise = fields.map(function(a, i) {
          return a.map(function(b) {
              var line = ''

              if (i === 0 && firstHeader === true) {
                  line += '\\bfseries '
              }
              if (isNumber(b) === false || precision === '-1') {
                  line += b
              } else {
                  line += parseFloat(b).toFixed(precision).toString()
              }
              return line
          }).join(' & ') + '\\\\'
      })

      precise.unshift('\\toprule')
      precise.unshift('\\begin{tabular}{' + columnCentered + '}')
      if (firstHeader) {
        precise.splice(3, 0, '\\midrule')
      }
      precise.push('\\bottomrule')
      precise.push('\\end{tabular}')

      return precise.join('\n')
  }

  transform(value,args){
    if (args[2] !== undefined && args[2] !== null){
      if (args[1] === '' || args[1] === '\t' || args[1] === "\\t") {
          args[1] = '\t'
      }
      return this.convert(value, args[1], '\n', args[0], args[2])
    }
    if (args[1]) {
      if (args[1] === '\t' || args[1] === "\\t") {
        args[1] = '\t'
      }
      return this.convert(value, args[1], '\n', args[0], true)
    }
    if(args[0]){
      return this.convert(value, '\t', '\n', args[0], true)
    } 

    return this.convert(value, '\t', '\n', 2, true)
  }
}