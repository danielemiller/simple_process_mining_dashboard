import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _eventLogId: number | null = null;

  set eventLogId(id: number | null) {
    this._eventLogId = id;
  }

  get eventLogId(): number | null {
    return this._eventLogId;
  }
}
