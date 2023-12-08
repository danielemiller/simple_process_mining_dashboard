import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ProcessDashboardComponent } from './components/process-dashboard/process-dashboard.component';
import { ProcessAnalysisComponent } from './components/process-analysis/process-analysis.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DocsComponent } from './components/docs/docs.component';

export const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: FileUploadComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: ProcessDashboardComponent, canActivate: [AuthGuard] },
  { path: 'analytics', component: ProcessAnalysisComponent, canActivate: [AuthGuard] },
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'docs', component: DocsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];