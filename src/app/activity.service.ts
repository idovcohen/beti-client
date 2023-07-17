import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { take } from "rxjs";

@Injectable()
export class ActivityService {
    private readonly THING_URL: string = 'http://localhost:8000/v1/activity'; 
    constructor(private readonly http: HttpClient) {
    }

    public doThingAsync(): Promise<boolean> {
        return new Promise((resolve) => {
            this.http.get(this.THING_URL).pipe(take(1)).subscribe((res => {
                resolve(true);            
            }));
        });
    }
}