import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth-service.service';

describe('AuthGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let authGuard: AuthGuard;
  let router: jasmine.SpyObj<Router>;
  let routeMock: Partial<ActivatedRouteSnapshot>;
  let routeStateMock: Partial<RouterStateSnapshot>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Provide any necessary configuration or mock services
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['isLoggedIn']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mock ActivatedRouteSnapshot and RouterStateSnapshot
    routeMock = { /* ... properties as needed ... */ };
    routeStateMock = { url: '/test-url' };
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should return true for canActivate when user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    const result = authGuard.canActivate(routeMock as ActivatedRouteSnapshot, routeStateMock as RouterStateSnapshot);
    expect(result instanceof Observable || typeof result === 'boolean').toBeTruthy();
    expect(result).toBeTrue();
  });

  it('should navigate to login when user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    const result = authGuard.canActivate(routeMock as ActivatedRouteSnapshot, routeStateMock as RouterStateSnapshot);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
