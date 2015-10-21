import {Component, bootstrap, FORM_DIRECTIVES} from 'angular2/angular2';
import {AceEditor} from './ace'
import {ToLatex} from './tolatex'

@Component({
	selector: 'tables-app',
  template:`
    <h1><span class="accent-color">tables</span>.joshuacaron.ca</h1>
    <p>Formats a table from a spreadsheet (e.g. a tab or comma separated value file) as a proper LaTeX table using booktabs.</p>
    <div class="layout horizontal wrap">
      <label class="layout horizontal"><span class="flex">Number of decimal places to round numbers to (use -1 to not round at all): </span><input [(ng-model)]="precision"></label>
      <label class="layout horizontal"><span class="flex">Text that separates columns (use '\\t' for tab): </span><input [(ng-model)]="separator"></label>
      <label class="layout horizontal"><span class="flex">Use the first row as a header row: </span><input type="checkbox" [(ng-model)]="firstHeader"></label>
      <label class="layout horizontal"><span class="flex">Escape all dollar signs: </span><input type="checkbox" [(ng-model)]="escapeDollarSigns"></label>
      <label class="layout horizontal"><span class="flex">Add commas to large numbers: </span><input type="checkbox" [(ng-model)]="addCommas"></label>
    </div>
    <div class="layout horizontal flex wrap">
      <div class="editor-size layout flex relative vertical"><ace-editor id="editor1" class="editor-size fit flex" [value]="code" (value-change)="output($event)" options='
        {"theme":"monokai",
         "mode": "plain_text",
         "tabsize": 4,
         "softtabs": false,
         "focus": true}
      '></ace-editor></div>
      <div class="layout flex relative vertical editor-size"><ace-editor id="editor2" class="editor-size fit flex" [value]="outputcode | tolatex:precision:separator:firstHeader:escapeDollarSigns:addCommas" options='{"theme":"monokai", "mode": "latex", "readOnly": true, "update": true}'></ace-editor></div>
    </div>
   `,
  styles: [`
    label {
      margin: 7.5px 5px;
      max-width: 600px;
      min-width: 600px;
    }
    label:last-child {
      margin-bottom: 15px;
    }
    input {
      width: 20px;
    }
    h1 {
      font-size:2.5em;
      margin: 0.4em 0 0.2em;
    }
    p {
      font-size:1.2em;
      font-style:italic;
    }
    .accent-color {
      color: #03A9F4;
    }
    .editor-size {
      min-height: 300px;
      min-width: 400px;
    }
  `],
  directives:[AceEditor,FORM_DIRECTIVES],
  pipes:[ToLatex]
})
export class AppComponent {
  code: string;
  outputcode: string;
  precision: string;
  separator: string;
  firstHeader: boolean;
  output: any;
  escapeDollarSigns: boolean;
  addCommas: boolean;
  constructor () {
    var that = this
    this.code = "Sample\tTable\n1\t4.8311\n2\t9340\n3\t4.99999\n4\t9.99999\n5\t10.0"
    this.outputcode = ""
    this.precision = "3"
    this.separator = `\\t`
    this.firstHeader = true
    this.escapeDollarSigns = true
    this.addCommas = false
    this.output = function(e){
      that.outputcode = e
    }
  }
}

bootstrap(AppComponent);
