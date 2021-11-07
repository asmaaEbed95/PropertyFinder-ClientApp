import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
    //we used pipe to convert the response to array<any> instead of the linear way of the subscripe
    return this.http.get('data/properties.json').pipe(
      map((data: any) => {
        const propertiesArray: Array<IPropertyBase> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp') || '');

        if (localProperties) {
          for (const id in localProperties) {
            if(data.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
              propertiesArray.push(localProperties[id]);
            }
          }
        }

        for (const id in data) {
          if(data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
  }

  addProperty(property: Property) {
    let newProperty = [property];

    //add new property in array if newProp allready exists in local storage
    if (localStorage.getItem('newProp')) {
      newProperty = [property, ...JSON.parse(localStorage.getItem('newProp') || '')];
    }

    localStorage.setItem('newProp', JSON.stringify(newProperty));
  }

  newPropId() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+(localStorage.getItem('PID') || '') + 1));
      return localStorage.getItem('PID');
    } else {
      localStorage.setItem("PID", "101");
      return 101;
    }
  }
}
