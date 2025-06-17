import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-zigar',
  templateUrl: './zigar.component.html',
  styleUrls: ['./zigar.component.css']
})
export class ZigarComponent implements OnInit {

  latitude = 38.1047;
  longitude = 70.4469;
  apiKey = 'AIzaSyCpdjR-JhLy81EYVBG1xMvHZjAXi75yEeg';

  constructor() {}

  ngOnInit(): void {
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
    });
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve) => {
      const scriptExists = document.getElementById('googleMaps');
      if (!scriptExists) {
        const script = document.createElement('script');
        script.id = 'googleMaps';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  initMap(): void {
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: { lat: this.latitude, lng: this.longitude },
        zoom: 16
      }
    );

    new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: map,
      title: 'Зиғар'
    });
  }

}
