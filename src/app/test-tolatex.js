var tolatex_1 = require('./tolatex');
var assert = window.chai.assert;
describe('toLatex module', function () {
    describe('Helper functions:', function () {
        describe('isNumber(n)', function () {
            it('should return false if n contains any characters besides numbers, periods, and minus signs', function () {
                assert.equal(false, tolatex_1.isNumber('123f31'));
                assert.equal(false, tolatex_1.isNumber('123-+kdsjfls.,ds'));
                assert.equal(false, tolatex_1.isNumber('+123'));
            });
            it('should return false if n is the empty string', function () {
                assert.equal(false, tolatex_1.isNumber(''));
            });
            it('should return true if n is an integer', function () {
                assert(tolatex_1.isNumber('12341131'));
                assert(tolatex_1.isNumber('-123'));
                assert(tolatex_1.isNumber('1'));
                assert(tolatex_1.isNumber('0'));
            });
            it('should return true if n is a float', function () {
                assert(tolatex_1.isNumber('123.455'));
                assert(tolatex_1.isNumber('-123.999'));
                assert(tolatex_1.isNumber('.123'));
                assert(tolatex_1.isNumber('10.'));
            });
            it('should only return true if n has at most one negative sign in front', function () {
                assert(tolatex_1.isNumber('-123'));
                assert.equal(false, tolatex_1.isNumber('--123'));
            });
        });
        describe('insertCommas(n)', function () {
            it('should not insert a comma if n has three or less non-decimal digits', function () {
                assert.equal('123', tolatex_1.insertCommas('123'));
                assert.equal('999', tolatex_1.insertCommas('999'));
                assert.equal('531.123431', tolatex_1.insertCommas('531.123431'));
            });
            it('should insert commas every three non-decimal digits', function () {
                assert.equal('123,456,789', tolatex_1.insertCommas('123456789'));
                assert.equal('987,654.321123', tolatex_1.insertCommas('987654.321123'));
            });
            it('should not insert commas in decimal places', function () {
                assert.equal('0.123456', tolatex_1.insertCommas('0.123456'));
            });
            it('should not interpret negative signs as a digit', function () {
                assert.equal('-123,456', tolatex_1.insertCommas('-123456'));
                assert.equal('-999', tolatex_1.insertCommas('-999'));
            });
        });
    });
    describe('ToLatex Pipe', function () {
        var pipe;
        var sampleCode = "Sample\tTable\n1\t4.8311\n2\t9340\n3\t4.99999\n4\t9.99999\n5\t10.0";
        beforeEach(function () {
            pipe = new tolatex_1.ToLatex();
        });
        it('should expose a transform function', function () {
            assert.equal('function', typeof pipe.transform);
        });
        it('should properly assume default parameters', function () {
            assert.equal(pipe.transform(sampleCode, ['3', '\t', true, true, false]), pipe.transform(sampleCode));
        });
        it('should split the text on the separator', function () {
            assert.equal('\\begin{tabular}{cc}\n\\toprule\n\\bfseries Sample & \\bfseries Table\\\\\n\\midrule\n1.000 & 4.831\\\\\n2.000 & 9340.000\\\\\n3.000 & 5.000\\\\\n4.000 & 10.000\\\\\n5.000 & 10.000\\\\\n\\bottomrule\n\\end{tabular}', pipe.transform(sampleCode));
            assert.equal('\\begin{tabular}{c}\n\\toprule\n\\bfseries Sample\tTable\\\\\n\\midrule\n1\t & .8311\\\\\n2\t93 & 0\\\\\n3\t & .99999\\\\\n & \t9.99999\\\\\n5\t10.0\\\\\n\\bottomrule\n\\end{tabular}', pipe.transform(sampleCode, ['-1', '4']));
        });
        it('should not round numbers if the precision is -1', function () {
            assert.equal('\\begin{tabular}{cc}\n\\toprule\n\\bfseries Sample & \\bfseries Table\\\\\n\\midrule\n1 & 4.8311\\\\\n2 & 9340\\\\\n3 & 4.99999\\\\\n4 & 9.99999\\\\\n5 & 10.0\\\\\n\\bottomrule\n\\end{tabular}', pipe.transform(sampleCode, ['-1']));
        });
        it('should bold the first row and add midrule iff firstHeader option is true', function () {
            assert.equal('\\begin{tabular}{cc}\n\\toprule\n\\bfseries Sample & \\bfseries Table\\\\\n\\midrule\n1.000 & 4.831\\\\\n2.000 & 9340.000\\\\\n3.000 & 5.000\\\\\n4.000 & 10.000\\\\\n5.000 & 10.000\\\\\n\\bottomrule\n\\end{tabular}', pipe.transform(sampleCode));
            assert.equal('\\begin{tabular}{cc}\n\\toprule\nSample & Table\\\\\n1.000 & 4.831\\\\\n2.000 & 9340.000\\\\\n3.000 & 5.000\\\\\n4.000 & 10.000\\\\\n5.000 & 10.000\\\\\n\\bottomrule\n\\end{tabular}', pipe.transform(sampleCode, [undefined, undefined, false]));
        });
    });
});
//# sourceMappingURL=test-tolatex.js.map