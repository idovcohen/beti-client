import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./constants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {}
  
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const username = sessionStorage.getItem(Constants.USERNAME_PROPERTY);
      const password = sessionStorage.getItem(Constants.PASSWORD_PROPERTY);
      const encodedCredentials ='Basic ' +  btoa(`${username}:${password}`);
      const sessionId = sessionStorage.getItem(Constants.SESSION_ID_PROPERTY);
      const headers: any = {};
      headers['Authorization'] = encodedCredentials;
      if (sessionId) {
        headers[Constants.SESSION_ID_PROPERTY] = sessionId; 
      }
      const authReq = req.clone({ setHeaders: headers});

      return next.handle(authReq);
    }
  }