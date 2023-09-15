import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainInputSectionFormComponent } from './main-input-section-form/main-input-section-form.component';

@Component({
  selector: 'app-main-input-section',
  standalone: true,
  imports: [CommonModule, MainInputSectionFormComponent],
  templateUrl: './main-input-section.component.html',
  styleUrls: ['./main-input-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainInputSectionComponent {}
