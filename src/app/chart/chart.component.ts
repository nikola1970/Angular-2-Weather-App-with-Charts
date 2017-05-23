import {Component, OnInit, ViewChild} from '@angular/core';
import {WeatherService} from '../weather.service';
import {NgForm} from '@angular/forms';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    @ViewChild('f') newCityForm: NgForm;
    @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

    cities = [];
    loading = true;
    barChartLabels: string[] = [];
    temps: number[] = [];

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 40,
                    stepSize: 2
                }
            }]
        }
    };

    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData: any[] = [
        {data: this.temps, label: 'Temperature'}
    ];


    constructor(private WeatherService: WeatherService) {}


    ngOnInit() {
        this.WeatherService.getCities().subscribe(
            city => this.cities.push(city.json()),
            error => console.log(error),
            () => {
                this.loading = false;
                this.cities.map(city => {
                    console.log(city);
                    this.barChartLabels.push(city.name);
                    this.temps.push(city.main.temp);
                });
            }
        );


    }

    addCity(newCity) {
        this.newCityForm.reset();
        this.WeatherService.addCity(newCity).subscribe(
                city => {
                    const bla = city.json();
                    this.cities.push(bla);
                    this.barChartLabels.push(bla.name);
                    this.temps.push(bla.main.temp);
                },
                error => console.log(error),
                () => {
                    this.cities = this.cities.slice();
                    this.chart.chart.update();
                }
            );
    }




    // events
    // public chartClicked(e:any):void {
    //     console.log(e);
    // }
    //
    // public chartHovered(e:any):void {
    //     console.log(e);
    // }


}
