import { Coordinate } from '../../redux/users/types';

export default function createGoogleMapsRouteUrl(destination: Coordinate) {
    return `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${destination.latitude},${destination.longitude}`;
}
