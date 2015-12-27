import {Component, Attribute, OnInit, Output, EventEmitter, OnChanges} from 'angular2/core'
var ace = require('brace');
require('brace/mode/latex');
require('brace/mode/plain_text');
require('brace/theme/monokai');


@Component({
  selector: 'ace-editor',
  template:`
    <div [id]="'editor-' + id" class="editors">{{value}}</div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .editors {
      width:100%;
      height:100%;
    }
  `],
  inputs: ['value','options','id']
})
export class AceEditor {
  @Output() valueChange = new EventEmitter();
  value: string;
  options: string;
  editor: any;
  oldValue: string;
  opts: any;
  id: string;
  constructor(){
    var that = this
    setTimeout(() => {
      that.editor = ace.edit('editor-' + that.id)
      that.editor.setValue(that.value, 1)
      that.valueChange.next(that.value) // so that functions binding to value have data initially
      that.editor.$blockScrolling = Infinity
      that.editor.setValue(that.value, 1)
      that.editor.setShowPrintMargin(false)
      if (that.options) {
        that.opts = JSON.parse(that.options)
        if (that.opts.readOnly === true) {
          that.editor.setReadOnly(true)
        }
        if (that.opts.theme) {
          that.editor.setTheme("ace/theme/" + that.opts.theme)
        }

        if (that.opts.mode) {
          that.editor.getSession().setMode("ace/mode/" + that.opts.mode)
        }
        if (that.opts.tabsize) {
          that.editor.getSession().setTabSize(that.opts.tabsize)
        }
        if (that.opts.softtabs !== undefined || that.opts.softtabs !== null) {
          that.editor.getSession().setUseSoftTabs(that.opts.softtabs)
        }
        if (that.opts.focus) {
          that.editor.focus()
        }
        if (that.opts.wordwrap) {
          that.editor.getSession().setUseWrapMode(true)
        }
      }
      that.editor.on('change', function(e) {
       that.valueChange.next(that.editor.getValue())
      })

    })
  }

  ngOnChanges(changes){
    var that = this
    if (that.editor && that.opts.update === true) {
      that.editor.setValue(that.value, 1)
    }
  }
}
