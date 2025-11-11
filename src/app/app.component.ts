import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonHeader, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
