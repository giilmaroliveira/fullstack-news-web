import { Component } from '@angular/core';
import { AuthService } from './core/_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fullstack-news-web';
  constructor(public authService: AuthService) {
    setInterval(() => {
      this.authService.renew().subscribe(response => {
        if (response.auth === true) {
          this.authService.setToken(response.token);
        }
      });
    }, 480000) // 8 minutos
  }
}
