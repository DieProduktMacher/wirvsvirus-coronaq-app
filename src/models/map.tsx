export type googleMapsGeocodeResponse = Array<googleMapsGeocodeEntry>;

export interface googleMapsGeocodeEntry {
  location_components: Array<{
    long_name: string;
    short_name: string;
    types: Array<string>;
  }>;
  formatted_address: string;
  location: { lat: string; long: string };
}
