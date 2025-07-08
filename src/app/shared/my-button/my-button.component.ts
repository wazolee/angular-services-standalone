import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MyButtonComponent {
  @Input() buttonText: string = 'Submit';
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() buttonId: string | number | null = null; // Egyedi azonosító a gombhoz
  @Output() buttonClick = new EventEmitter<string | number | null>();

  onClick() {
    this.buttonClick.emit(this.buttonId);
  }
}