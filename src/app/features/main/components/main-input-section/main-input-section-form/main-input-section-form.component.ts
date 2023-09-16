import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MainFormService } from '../../../services/main-form.service';
import {
  MainInputSectionFormControls,
  MainInputSectionFormLabels
} from './main-input-section-form.config';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MainRoutes } from '../../../../../routes';
import { fromFormToModel } from '../../../../../core/utils/api-parser';

@Component({
  selector: 'app-main-input-section-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './main-input-section-form.component.html',
  styleUrls: ['./main-input-section-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainInputSectionFormComponent {
  form = this._mainInfoFormService.mainInputForm;
  controls = MainInputSectionFormControls;
  labels = MainInputSectionFormLabels;

  constructor(
    private readonly _mainInfoFormService: MainFormService,
    private readonly _router: Router
  ) {}

  search() {
    const value = fromFormToModel(this.form.value);
    this._router.navigate([MainRoutes.MAIN], { queryParams: value });
  }
}
