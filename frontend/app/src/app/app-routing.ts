import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ProcessDashboardComponent } from './components/process-dashboard/process-dashboard.component';
import { ProcessAnalysisComponent } from './components/process-analysis/process-analysis.component';


export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'dashboard', component: ProcessDashboardComponent },
  { path: 'analytics', component: ProcessAnalysisComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];