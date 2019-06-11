import {Animated} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

class Polyline {
  constructor(lineStringFeature) {
    this._coordinates = lineStringFeature.geometry.coordinates;
    this._lineStringFeature = lineStringFeature;

    this._totalDistance = 0;

  }

  get(index) {
    return MapboxGL.geoUtils.makePoint(this._coordinates[index]);
  }

  get totalDistance() {
    return this._totalDistance;
  }
}

class RouteSimulator {
  constructor(lineString, speed = 0.04) {
    this._polyline = new Polyline(lineString);
    this._previousDistance = 0;
    this._currentDistance = 0;
    this._speed = speed;
  }

  addListener(listener) {
    this._listener = listener;
  }

  start() {
    this.tick();
  }

  reset() {
    this._previousDistance = 0;
    this._currentDistance = 0;
    this.start();
  }

  stop() {
    if (this._anim) {
      this._anim.stop();
    }
  }

  tick() {
    requestAnimationFrame(() => {
      this._previousDistance = this._currentDistance;
      this._currentDistance += this._speed;

      // interpolate between previous to current distance
      const listener = step => {
        this.emit(currentPosition);
      };

      this._animatedValue = new Animated.Value(this._previousDistance);
      this._animatedValue.addListener(listener);

      this._anim = Animated.timing(this._animatedValue, {
        toValue: this._currentDistance,
        duration: 5,
        useNativeDriver: false,
      });

      this._anim.start(() => {
        this._animatedValue.removeListener(listener);

        if (this._currentDistance > this._polyline.totalDistance) {
          this.reset();
          return;
        }

        this.tick();
      });
    });
  }

  emit(pointFeature) {
    this._listener(pointFeature);
  }
}

export default RouteSimulator;
