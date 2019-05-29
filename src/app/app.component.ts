import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  NgZone
} from '@angular/core';

let loadedMonaco = false;
let loadPromise: Promise<void>;
declare const require: any;
declare const monaco: any;

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
    this.loadMonaco();
  }

  changeLanguage() {
    this.language = this.language === 'javascript' ? 'json' : 'javascript';
    this.initMonaco();
  }

  loadMonaco() {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco();
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = '/assets';
        if (typeof (<any>window).monaco === 'object') {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({
            paths: { vs: `${baseUrl}/monaco/vs` }
          });
          (<any>window).require(['vs/editor/editor.main'], () => {
            console.log('Monaco is loaded!');
            this.initMonaco();
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement(
            'script'
          );
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/monaco/vs/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
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
