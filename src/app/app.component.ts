import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  NgZone
} from '@angular/core';

import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('editorContainer') _editorContainer: ElementRef;
  title = 'angular-monaco-test';
  _editor: any;
  options: any = {};
  value = `
    let loadedMonaco = false;
    let loadPromise: Promise<void>;
    declare const require: any;
    declare const monaco: any;
  `;

  language = 'javascript';

  constructor(private zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMonaco();
  }

  changeLanguage() {
    this.language = this.language === 'javascript' ? 'json' : 'javascript';
    this.initMonaco();
  }

  initMonaco() {
    console.log('initMonaco()');
    this.options.language = this.language;
    this._editor = monaco.editor.create(
      this._editorContainer.nativeElement,
      this.options
    );

    this._editor.setValue(this.value);

    this._editor.onDidChangeModelContent((e: any) => {
      this.value = this._editor.getValue();
    });
  }
}
