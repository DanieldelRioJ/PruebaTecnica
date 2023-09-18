import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MainOutputChartSectionComponent } from './main-output-chart-section/main-output-chart-section.component';
import { MainOutputTableComponent } from './main-output-table/main-output-table.component';
import { MatDividerModule } from '@angular/material/divider';
import { MainModelService } from '../../services/main-model.service';
import { map } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-output-section',
  standalone: true,
  imports: [
    CommonModule,
    MainOutputChartSectionComponent,
    MainOutputTableComponent,
    MatDividerModule,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './main-output-section.component.html',
  styleUrls: ['./main-output-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputSectionComponent {
  noData$ = this._mainModelService.data$.pipe(map((data) => data == null));
  constructor(private readonly _mainModelService: MainModelService) {}
}
