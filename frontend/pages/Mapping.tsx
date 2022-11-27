export class GoogleMap implements IMap {
    public name: string;
    private map: any;
    private options: any;

    constructor (mapDiv: Element) {
        this.name = "GoogleMap";
        this.options = {center: new google.maps.LatLng(53.83305, -1.66412), zoom: 3, MapTypeId: 'terrian' };
        this.map = new google.maps.Map(mapDiv, this.options);
    }
  }

export default GoogleMap;