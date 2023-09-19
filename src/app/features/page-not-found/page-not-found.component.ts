import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from '../../shared/components/menubar/menubar.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, MenubarComponent, MatButtonModule, TranslateModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(private readonly _router: Router) {}
  navigateRoot() {
    this._router.navigate(['/']);
  }
}
