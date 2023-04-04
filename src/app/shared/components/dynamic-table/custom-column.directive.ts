import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appCustomColumn]'
})
export class CustomColumnDirective {
  @Input('columName') columName!: string;

  constructor(
    public templateRef: TemplateRef<any>
  ) { }

}
