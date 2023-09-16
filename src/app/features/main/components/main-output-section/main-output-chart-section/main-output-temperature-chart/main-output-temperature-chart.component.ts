import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-output-temperature-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-output-temperature-chart.component.html',
  styleUrls: ['./main-output-temperature-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputTemperatureChartComponent {}
