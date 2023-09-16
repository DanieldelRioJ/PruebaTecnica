import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-output-chart-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-output-chart-section.component.html',
  styleUrls: ['./main-output-chart-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputChartSectionComponent {}
