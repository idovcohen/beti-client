import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public username: string = '';
  public password: string ='';
  title = 'beti-client';

  constructor(private readonly loginSvc: LoginService,
              private readonly activitySvc: ActivityService) {
  }

  public async login(): Promise<void> {
    await this.loginSvc.loginAsync(this.username, this.password);
  }

  public async activate(): Promise<void> {
    await this.activitySvc.doThingAsync();
  }

}
