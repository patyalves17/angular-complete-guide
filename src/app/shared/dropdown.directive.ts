import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false; 

    constructor(private elRef: ElementRef){}

    // @HostListener('click') toggleOpen(eventData: Event) {
    //     this.isOpen = !this.isOpen;
    // }

    //closing the dropdown from anywhere
    @HostListener('document:click',['$event'])toggleOpen(eventData: Event){
        this.isOpen = this.elRef.nativeElement.contains(event.target)? !this.isOpen : false;
    }

}