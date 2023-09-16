import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainOutputTemperatureChartComponent } from './main-output-temperature-chart/main-output-temperature-chart.component';

@Component({
  selector: 'app-main-output-chart-section',
  standalone: true,
  imports: [CommonModule, MainOutputTemperatureChartComponent],
  templateUrl: './main-output-chart-section.component.html',
  styleUrls: ['./main-output-chart-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputChartSectionComponent {}
