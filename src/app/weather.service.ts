import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/Rx";


@Injectable()
export class WeatherService {

    private URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
    private API_KEY = '&APPID=397843cb2d3cbe8f748d85fd572da092&units=metric';
    defaultCities = ['Belgrade', 'Prijepolje', 'Uzice', 'Surfside Beach'];

    constructor(private http: Http) {

    }

    getCities() {
        return Observable.of(...this.defaultCities)
            .concatMap(city => this.http.get(this.URL + city + this.API_KEY));
    }

    addCity(newCity) {
       return this.http.get(this.URL + newCity + this.API_KEY);
    };



}
