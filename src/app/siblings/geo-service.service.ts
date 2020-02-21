import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeoServiceService {

  constructor(private http: HttpClient) { }

  getLocation(term: string): Observable<any> {
    return this.http.get(
      "https://maps.google.com/maps/api/geocode/json?address=" +
        term +
        "&key=AIzaSyBwpIoGAWFL4xQnYb7ZT_p9lWQugkhTg10"
    );
  }
}
