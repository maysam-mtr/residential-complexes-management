import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth";
import { inject } from "@angular/core";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn){
    const authService = inject(AuthService);
    const token = authService.token;

    const newReq = token ? req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
    }) : req;

    console.log(newReq)

    return next(newReq).pipe(
        catchError(err => {
            if(err.status === 401 || err.status === 0) {
               authService.logout();
                window.location.href = '/login';
            }

            return throwError(() => err);
        })
    )
}