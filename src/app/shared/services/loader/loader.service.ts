import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLoaderStatus(){
    return this._isLoader;
  }

  setLoaderStatus(val: boolean){
    this._isLoader.next(val);
  }
}
