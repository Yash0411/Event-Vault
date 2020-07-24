import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Event Vault';

  itemValue = '';
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase , public auth: AuthService) {
    this.items = db.list('items').valueChanges();
  }
}
