import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


// import { Filters } from './interfaces/Filters';

import { map, Observable, shareReplay } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    RouterLink,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'SandeepGupta_Assign_1';

  
  isHandset$ : Observable<boolean>;

  router = [
    {
      pageName: 'home',
      icon: 'home',
      url: '/home',
    },
    {
      pageName: 'movies',
      icon: 'movie',
      url: '/movies',
    },
    {
      pageName: 'posts',
      icon: 'flag',
      url: '/posts',
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver){
    this.isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  };
}
