import config from "./config";

export class OrsApi {
  constructor() {}

  async reverseGeocode(point: L.LatLng): Promise<string> {
    const { apiKey, reverseGeocodeUrl } = config;

    const url: string = `${reverseGeocodeUrl}api_key=${apiKey}&point.lon=${point.lng}&point.lat=${point.lat}`;
    const json = await fetch(url).then((r) => r.json());

    return json.features[0].properties.label;
  }

  async route(
    startPoint: L.LatLng,
    endPoint: L.LatLng,
    profile: string = "driving-car"
  ): Promise<object> {
    const { apiKey, routeServiceUrl } = config;

    const startCoords: string = `${startPoint.lng},${startPoint.lat}`;
    const endCoords: string = `${endPoint.lng},${endPoint.lat}`;
    
    console.log("url sending");

    const url: string = `${routeServiceUrl}${profile}?api_key=${apiKey}&start=${startCoords}&end=${endCoords}`;

    const json = await fetch(url).then((r) => r.json());
    console.log("route fetched");
    return json;
  }

  async geocode(searchTerm: string): Promise<string[]> {
    const { apiKey, geocodeServiceUrl } = config;
    const apiUrl = `${geocodeServiceUrl}api_key=${apiKey}&text=${searchTerm}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      
      return data.features
    } catch (error) {
      console.error("Error fetching geocoding suggestions:", error);
      return [];
    }

    return [];
  }

  async reach(center: L.LatLng,
    range: number, 
    interval: number): Promise<object> {
    const { apiKey, reachServiceUrl } = config;

    const url: string = `${reachServiceUrl}`;
    const body = {
      locations: [[center.lng, center.lat]],
      range: [range],
      interval: interval,
      range_type: "distance",
      units: "km",
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey,
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();
      console.log(response.status, response.statusText)
      return json;
    } catch (error) {
      console.error("Error fetching isochrone:", error);
      throw error;
    }
  }
}
