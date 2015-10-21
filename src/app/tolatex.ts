import {Pipe, PipeTransform} from 'angular2/angular2'

@Pipe({ name: "tolatex" })
export class ToLatex implements PipeTransform {
  convert(text, fs, rs, precision, firstHeader, escapeDollarSigns) {
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

      if (escapeDollarSigns) {
        workingText = workingText.replace(/[\\]*\$/g, '\\\$')
      }

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
    // escape dollar signs
    if (args[3] === undefined && args[3] === null) {
       args[3] = false
    }
    // first row is header
    if (args[2] === undefined || args[2] === null){
      args[2] = true
    }
    // column separator
    if (args[1] === '' || args[1] === '\t' || args[1] === "\\t" || args[1] === undefined || args[2] === null) {
        args[1] = '\t'
    }
    // precision
    if (args[0] === undefined || args[0] === null) {
      args[0] = 2
    }
    return this.convert(value, args[1], '\n', args[0], args[2], args[3])
  }
}