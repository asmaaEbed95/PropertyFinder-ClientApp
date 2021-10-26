import { ActivatedRoute, Router } from '@angular/router';
import { IProperty } from './../IProperty.interface';
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  //default values
  SellRent = 1;
  properties: Array<IProperty> = [];

  constructor(private route: ActivatedRoute, private housingServise: HousingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()) {
      this.SellRent = 2; //Means we are on rent property URL else we are on base URL
    }
    this.housingServise.getAllProperties(this.SellRent).subscribe(data => {
      this.properties = data;
      console.log(this.route.snapshot.url.toString())
      }, error => {
        console.log(error);
      }
    );
  }

}
