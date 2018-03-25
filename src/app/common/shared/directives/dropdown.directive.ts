import {Directive, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.active') isDropdown: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isDropdown = false;
  }

  @HostListener('click') toggleDropdown(): void {
    this.isDropdown = !this.isDropdown;
  }
}
