import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  IWeatherDay,
  IWeatherResponse
} from '../../../models/weather-response.model';
import { MainModelService } from '../../../services/main-model.service';
import { UnsubscribeDirective } from '../../../../../shared/directives/unsubscribe.directive';
import { combineLatest, filter, map, takeUntil, tap } from 'rxjs';
import { checkIndividualModelType } from '../../../../../shared/types/individual-model.type';
import { MainOutputTableColumns } from './main-output-table.config';
import { TranslateModule } from '@ngx-translate/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslationService } from '../../../../../core/services/translation.service';
import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-main-output-table',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    LoadingComponent
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

  constructor(
    private readonly _mainModelService: MainModelService,
    private readonly _translationService: TranslationService,
    private readonly _datePipe: DatePipe
  ) {
    super();
  }

  ngOnInit(): void {
    this._getData();
  }

  private _getData() {
    combineLatest([
      this._mainModelService.data$,
      this._translationService.lang$
    ])
      .pipe(
        filter(([data]) => checkIndividualModelType(data)),
        tap(console.log),
        map(([data, lang]) => {
          //return (data as IWeatherResponse)!.days;
          return (data as IWeatherResponse)!.days.map((day) => {
            const newDay = { ...day }; //Avoid aliasing
            newDay.datetime = this._datePipe.transform(
              newDay.datetime,
              'fullDate',
              undefined,
              lang
            ) as string;
            return newDay;
          });
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((days) => (this.dataSource.data = days));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
