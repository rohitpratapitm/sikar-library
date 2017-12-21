import { Component, Input } from '@angular/core';

@Component({
    selector: 'y-spinner',
    template: `
        <div *ngIf="show" >
            <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
        </div>
    `
})
export class SpinnerComponent {

    @Input()
    show: boolean;

    constructor() {

    }
    
}
