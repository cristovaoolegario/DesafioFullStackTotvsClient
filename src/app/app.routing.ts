import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { AuctionComponent } from './auction';
import { AdminGuard } from './_guards/admin.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path : 'auction', component: AuctionComponent, canActivate: [AdminGuard]},

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);