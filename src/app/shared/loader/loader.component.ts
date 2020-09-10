import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader-service/loader.service';

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
