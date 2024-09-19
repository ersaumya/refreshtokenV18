import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  let loginUserData: any;
  const localData = localStorage.getItem('tokenData');
  if (localData != null) {
    loginUserData = JSON.parse(localData);
  }
  const cloneRequest = req.clone({
    // headers: req.headers.append(
    //   'Authorization',
    //   `Bearer ${loginUserData.token}`
    // ),
    setHeaders: {
      Authorization: `Bearer ${loginUserData.token}`,
    },
  });
  return next(cloneRequest);
};
