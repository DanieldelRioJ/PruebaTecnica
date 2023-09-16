import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-output-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-output-section.component.html',
  styleUrls: ['./main-output-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputSectionComponent {}
