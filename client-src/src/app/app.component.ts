import { Component } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';

@Component({
  selector: 'app-root',
  imports: [CanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pixel-art';
}
