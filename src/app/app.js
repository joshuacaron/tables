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
var ace_1 = require('./ace');
var tolatex_1 = require('./tolatex');
var AppComponent = (function () {
    function AppComponent() {
        var that = this;
        this.code = "Sample\tTable\n1\t4.8311\n2\t9340\n3\t4.99999\n4\t9.99999\n5\t10.0";
        this.outputcode = "";
        this.precision = "3";
        this.separator = "\\t";
        this.firstHeader = true;
        this.output = function (e) {
            that.outputcode = e;
        };
    }
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'tables-app',
            template: "\n    <h1><span class=\"accent-color\">tables</span>.joshuacaron.ca</h1>\n    <p>Formats a table from a spreadsheet (e.g. a tab or comma separated value file) as a proper LaTeX table using booktabs.</p>\n    <div class=\"layout vertical\">\n      <label class=\"layout horizontal\"><span class=\"flex\">Number of decimal places to round numbers to (use -1 to not round at all): </span><input [(ng-model)]=\"precision\"></label>\n      <label class=\"layout horizontal\"><span class=\"flex\">Text that separates columns (use '\\t' for tab): </span><input [(ng-model)]=\"separator\"></label>\n      <label class=\"layout horizontal\"><span class=\"flex\">Use the first row as a header row: </span><input type=\"checkbox\" [(ng-model)]=\"firstHeader\"></label>\n    </div>\n    <div class=\"layout horizontal flex wrap\">\n      <div class=\"editor-size layout flex relative vertical\"><ace-editor id=\"editor1\" class=\"editor-size fit flex\" [value]=\"code\" (value-change)=\"output($event)\" options='\n        {\"theme\":\"monokai\",\n         \"mode\": \"plain_text\",\n         \"tabsize\": 4,\n         \"softtabs\": false,\n         \"focus\": true}\n      '></ace-editor></div>\n      <div class=\"layout flex relative vertical editor-size\"><ace-editor id=\"editor2\" class=\"editor-size fit flex\" [value]=\"outputcode | tolatex:precision:separator:firstHeader\" options='{\"theme\":\"monokai\", \"mode\": \"latex\", \"readOnly\": true, \"update\": true}'></ace-editor></div>\n    </div>\n   ",
            styles: ["\n    label {\n      margin: 7.5px 0;\n      max-width: 650px;\n    }\n    label:last-child {\n      margin-bottom: 15px;\n    }\n    input {\n      width: 40px;\n    }\n    h1 {\n      font-size:2.5em;\n      margin: 0.4em 0 0.2em;\n    }\n    p {\n      font-size:1.2em;\n      font-style:italic;\n    }\n    .accent-color {\n      color: #03A9F4;\n    }\n    .editor-size {\n      min-height: 300px;\n      min-width: 400px;\n    }\n  "],
            directives: [ace_1.AceEditor, angular2_1.FORM_DIRECTIVES],
            pipes: [tolatex_1.ToLatex]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent);
//# sourceMappingURL=app.js.map