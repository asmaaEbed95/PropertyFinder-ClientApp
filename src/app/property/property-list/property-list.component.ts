import { IProperty } from './../IProperty.interface';
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: Array<IProperty> = [];

  constructor(private housingServise: HousingService) { }

  ngOnInit(): void {
    this.housingServise.getAllProperties().subscribe(data => {
      this.properties = data;
      }, error => {
        console.log(error);
      }
    );
  }

}
