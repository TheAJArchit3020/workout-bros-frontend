import { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationDetails, setLocationDetails] = useState(null);
  const [cities, setCities] = useState([]);

  const getLocationDetails = async (latitude, longitude) => {
    try {
      // Using OpenStreetMap Nominatim API for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      
      const countryCode = data.address.country_code.toUpperCase();
      const stateName = data.address.state;
      
      // Get country and state details
      const country = Country.getCountryByCode(countryCode);
      const states = State.getStatesOfCountry(countryCode);
      const state = states.find(s => s.name.toLowerCase() === stateName.toLowerCase());
      
      if (country && state) {
        setLocationDetails({
          country: country.name,
          state: state.name,
          countryCode: countryCode,
          stateCode: state.isoCode
        });

        // Get cities for the state
        const citiesList = City.getCitiesOfState(countryCode, state.isoCode);
        setCities(citiesList);
      } else {
        setError('Could not find location details');
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
      setError('Failed to fetch location details');
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(locationData);
        setLoading(false);
        await getLocationDetails(locationData.latitude, locationData.longitude);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { location, error, loading, requestLocation, locationDetails, cities };
};

export default useLocation; 