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
var AceEditor = (function () {
    function AceEditor() {
        this.valueChange = new angular2_1.EventEmitter();
        var that = this;
        setTimeout(function () {
            that.editor = ace.edit('editor-' + that.id);
            that.editor.setValue(that.value, 1);
            that.valueChange.next(that.value); // so that functions binding to value have data initially
            that.editor.$blockScrolling = Infinity;
            that.editor.setValue(that.value, 1);
            that.editor.setShowPrintMargin(false);
            if (that.options) {
                that.opts = JSON.parse(that.options);
                if (that.opts.readOnly === true) {
                    that.editor.setReadOnly(true);
                }
                if (that.opts.theme) {
                    that.editor.setTheme("ace/theme/" + that.opts.theme);
                }
                if (that.opts.mode) {
                    that.editor.getSession().setMode("ace/mode/" + that.opts.mode);
                }
                if (that.opts.tabsize) {
                    that.editor.getSession().setTabSize(that.opts.tabsize);
                }
                if (that.opts.softtabs !== undefined || that.opts.softtabs !== null) {
                    that.editor.getSession().setUseSoftTabs(that.opts.softtabs);
                }
                if (that.opts.focus) {
                    that.editor.focus();
                }
            }
            that.editor.on('change', function (e) {
                that.valueChange.next(that.editor.getValue());
            });
        });
    }
    AceEditor.prototype.onChanges = function (changes) {
        var that = this;
        if (that.editor && that.opts.update === true) {
            that.editor.setValue(that.value, 1);
        }
    };
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', Object)
    ], AceEditor.prototype, "valueChange");
    AceEditor = __decorate([
        angular2_1.Component({
            selector: 'ace-editor',
            template: "\n    <div [id]=\"'editor-' + id\" class=\"editors\">{{value}}</div>\n  ",
            styles: ["\n    :host {\n      display: block;\n    }\n    .editors {\n      width:100%;\n      height:100%;\n    }\n  "],
            inputs: ['value', 'options', 'id']
        }), 
        __metadata('design:paramtypes', [])
    ], AceEditor);
    return AceEditor;
})();
exports.AceEditor = AceEditor;
//# sourceMappingURL=ace.js.map