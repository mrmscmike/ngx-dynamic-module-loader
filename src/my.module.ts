import { NgModule, Component } from '@angular/core';

import { CommonModule } from '@angular/common';


@Component({
    selector: 'my-component',
    template: `<h1>Hello!</h1>`,
})
export class MyComponent  {

    constructor() {
    }

}

@NgModule({
    declarations: [MyComponent],
    imports: [
        CommonModule, 
    ],
})
export default class MyModule { }