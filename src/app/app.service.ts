import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Destination {
  destination_id: number,
  location: string,
  country: string,
  description: string,
  tourist_target: string,
  estimated_cost_per_day: number,
}

@Injectable()
export class Service {
  constructor(private http: HttpClient) { }

  public getDestinations(page: number, filter: string) {
    return this.http.get<Destination[]>('http://localhost/vacations/php/get_all_destinations.php?page=' + page + '&filter=' + filter);
  }

  public insertDestination(data: any): Observable<object> {
    return this.http.post('http://localhost/vacations/php/add_destination.php', data);
  }

  public updateDestination(data: any): Observable<object> {
    return this.http.patch('http://localhost/vacations/php/update_destination.php', data);
  }

  public deleteDestination(destination_id: number): Observable<object> {
    return this.http.delete('http://localhost/vacations/php/delete_destination.php?destination_id=' + destination_id);
  }
}
