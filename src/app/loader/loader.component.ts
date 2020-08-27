import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../shared/services/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoader = false;

  isLoaderSubscription: Subscription;

  constructor( private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.isLoaderSubscription = this.loaderService.getLoaderStatus()
      .subscribe((status: boolean) => {
        this.isLoader = status;
    })
  }
  
  ngOnDestroy():void {
    this.isLoaderSubscription.unsubscribe();
  }

}
