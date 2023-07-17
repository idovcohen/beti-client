import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable, Subject, take } from "rxjs";
import { LoginRequestDto } from "./login-request.dto";
import { Constants } from "./constants";

@Injectable()
export class LoginService {
    private readonly LOGIN_URL: string = 'http://localhost:8000/v1/login'; 
    public readonly error$: Observable<void> = new Subject<void>();
    constructor(private readonly http: HttpClient) {
    }

    public loginAsync(username: string, password: string): Promise<boolean> {
        return new Promise((resolve) => {
            const request: LoginRequestDto = {
                username,
                password
            };
            sessionStorage.setItem(Constants.USERNAME_PROPERTY, username);
            sessionStorage.setItem(Constants.PASSWORD_PROPERTY, password);

            this.http.post(this.LOGIN_URL, request).pipe(take(1)).subscribe((res: any) => {
                sessionStorage.setItem(Constants.SESSION_ID_PROPERTY, res.sessionId);
                resolve(true);     
            });
        });
    }
}