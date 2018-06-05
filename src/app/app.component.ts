import { Component, ViewChild, Compiler, Injector, ViewContainerRef } from '@angular/core';


import * as AngularCommon from '@angular/common';
import * as AngularCore from '@angular/core';

declare var SystemJS;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string;

  @ViewChild('vc', {read: ViewContainerRef}) vc;

  constructor(private compiler: Compiler, 
              private injector: Injector){
    this.url = "./my.module.js";
  }

  load() {
    
    // register the modules that we already loaded so that no HTTP request is made
    // in my case, the modules are already available in my bundle (bundled by webpack)
    SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
    SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));

    // now, import the new module

    SystemJS.import(this.url).then((module) => {
      this.compiler.compileModuleAndAllComponentsAsync(module.default)
          .then((compiled) => {
              let moduleRef = compiled.ngModuleFactory.create(this.injector);
              let factory = compiled.componentFactories[compiled.componentFactories.length - 1];
              if (factory) {
                  let component = this.vc.createComponent(factory);
                  let instance = component.instance;
              }
          });
      });
  }
}
