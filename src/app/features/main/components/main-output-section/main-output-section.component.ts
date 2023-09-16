import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainOutputChartSectionComponent } from './main-output-chart-section/main-output-chart-section.component';
import { MainOutputTableComponent } from './main-output-table/main-output-table.component';

@Component({
  selector: 'app-main-output-section',
  standalone: true,
  imports: [
    CommonModule,
    MainOutputChartSectionComponent,
    MainOutputTableComponent
  ],
  templateUrl: './main-output-section.component.html',
  styleUrls: ['./main-output-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputSectionComponent {}
