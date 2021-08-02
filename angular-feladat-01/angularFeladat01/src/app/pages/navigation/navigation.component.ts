import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  navigation = this.config.navigation;
  loginStatus = false;
  userSub!: Subscription; // feliratkozásokat tárolok
  // feliratkozásokat tárolok

  user: User | null = null;

  constructor(
    private config: ConfigService,
    private auth: AuthService,        // hitelesítéshez

  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.currentUserSubject.subscribe(    // elmentek egy feliratkozást egy observable-re
      user => this.user = user    // hogy értesüljek, ha változik a felhasználónak az állapota, be van-e lépve valaki
    );
  }     // vagy null, vagy user lesz, ezért nem kell hibakezelés

  ngOnDestroy() {               // liratkozáshoz, hogy felszabadítsam a memóriát
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.auth.logout();         // ezt fogom kattintásra meghívni, a kijelentkezést
  }

}
