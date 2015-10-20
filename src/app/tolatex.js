var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var ToLatex = (function () {
    function ToLatex() {
    }
    ToLatex.prototype.convert = function (text, fs, rs, precision, firstHeader) {
        function isNumber(x) {
            var y = x.match(/[0-9.]+/g);
            if (y !== null && y.length === 1 && y[0].length === x.length && x !== '.') {
                return true;
            }
            else {
                return false;
            }
        }
        var workingText = text;
        // Fix line endings
        workingText = workingText.replace(/\r\n|\r/g, "\n");
        var records = workingText.split(rs);
        var fields = records.map(function (a) {
            return a.split(fs);
        });
        var numColumns = fields[0].length;
        // fields.map(function(a) {
        //     if (a.length !== numColumns) {
        //         throw new Error("The number of columns must be the same in every row")
        //     }
        // })
        var columnCentered = '';
        while (numColumns--) {
            columnCentered += 'c';
        }
        var precise = fields.map(function (a, i) {
            return a.map(function (b) {
                var line = '';
                if (i === 0 && firstHeader === true) {
                    line += '\\bfseries ';
                }
                if (isNumber(b) === false || precision === '-1') {
                    line += b;
                }
                else {
                    line += parseFloat(b).toFixed(precision).toString();
                }
                return line;
            }).join(' & ') + '\\\\';
        });
        precise.unshift('\\toprule');
        precise.unshift('\\begin{tabular}{' + columnCentered + '}');
        if (firstHeader) {
            precise.splice(3, 0, '\\midrule');
        }
        precise.push('\\bottomrule');
        precise.push('\\end{tabular}');
        return precise.join('\n');
    };
    ToLatex.prototype.transform = function (value, args) {
        if (args[2] !== undefined && args[2] !== null) {
            if (args[1] === '\t' || args[1] === "\\t") {
                args[1] = '\t';
            }
            return this.convert(value, args[1], '\n', args[0], args[2]);
        }
        if (args[1]) {
            if (args[1] === '\t' || args[1] === "\\t") {
                args[1] = '\t';
            }
            return this.convert(value, args[1], '\n', args[0], true);
        }
        if (args[0]) {
            return this.convert(value, '\t', '\n', args[0], true);
        }
        return this.convert(value, '\t', '\n', 2, true);
    };
    ToLatex = __decorate([
        angular2_1.Pipe({ name: "tolatex" }), 
        __metadata('design:paramtypes', [])
    ], ToLatex);
    return ToLatex;
})();
exports.ToLatex = ToLatex;
//# sourceMappingURL=tolatex.js.map