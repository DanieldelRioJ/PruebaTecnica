import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IWeatherDay } from '../../../models/weather-response.model';
import { MainModelService } from '../../../services/main-model.service';
import { UnsubscribeDirective } from '../../../../../core/directives/unsubscribe.directive';
import { filter, map, takeUntil } from 'rxjs';
import { checkIndividualModelType } from '../../../../../core/types/individual-model.type';
import { MainOutputTableColumns } from './main-output-table.config';
import { TranslateModule } from '@ngx-translate/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-main-output-table',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './main-output-table.component.html',
  styleUrls: ['./main-output-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputTableComponent
  extends UnsubscribeDirective
  implements OnInit, AfterViewInit
{
  loading$ = this._mainModelService.data$.pipe(
    map((model) => model === 'loading')
  );
  displayedColumns = MainOutputTableColumns;
  displayedColumnsIds = MainOutputTableColumns.map((col) => col.id);
  dataSource = new MatTableDataSource<IWeatherDay>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly _mainModelService: MainModelService) {
    super();
  }

  ngOnInit(): void {
    this._getData();
  }

  private _getData() {
    this._mainModelService.data$
      .pipe(
        filter(checkIndividualModelType),
        map((data) => data.days),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((days) => (this.dataSource.data = days));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
