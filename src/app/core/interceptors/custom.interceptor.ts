import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const userService = inject(UserService);

  let loginUserData: any;
  const localData = localStorage.getItem('tokenData');
  if (localData != null) {
    loginUserData = JSON.parse(localData);
  }
  const cloneRequest = req.clone({
    headers: req.headers.append(
      'Authorization',
      `Bearer ${loginUserData.token}`
    ),
    // setHeaders: {
    //   Authorization: `Bearer ${loginUserData.token}`,
    // },
  });
  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const isRefresh = confirm(
          'Your session has expired.Do you want to continue.'
        );
        if (isRefresh) {
          userService.$refreshToken.next(true);
        }
      }
      return throwError(error);
    })
  );
};
