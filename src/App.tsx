import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import './index.css';
import Header from './components/Header/Header';
import Parse from './parseConfig';
import Filter from './components/Filter/Filter';
import Detalle from './components/Detalle/Detalle';
import CardComponent from './components/Card/CardComponent';

interface allSmileCenters {
  objectId: string;
  Center_Name: string;
  Moons_Center: boolean;
  Center_Type: string;
  Street: string;
  City: string;
  Zone: string;
  Neighborhood: string;
  Region: string;
  State: string;
  Country: string;
  Notes: string;
  Center_Desc: string;
  Apt: string;
  Map_URL: string;
  Phone: string;
  promo: string;
  whatsAppLink: string;
  Services: {
    [key: string]: {
      productId: string;
      AppointmentTypeId: string;
    };
  };
  Calendar_Id: number;
  Apointment_Type_Id: string;
  Timetable: {
    saturday: string[];
    weekdays: string[];
  };
}

interface Country {
  label: string;
  id: string;
  type: string;
}

interface CenterType {
  label: string;
  id: string;
  type: string;
}

interface ServiceData {
  label: string;
  id: string;
}

function App() {

  const [smileCenters, setSmileCenters] = React.useState<allSmileCenters[]>([]);
  const [filteredCenters, setFilteredCenters] = React.useState<allSmileCenters[]>([]);

  const [countries, setCountries] = React.useState<Country[]>([]);
  const [centerTypes, setCenterTypes] = React.useState<CenterType[]>([]);
  const [services, setServices] = React.useState<ServiceData[]>([]);
  
  const [valueCountry, setValueCountry] = React.useState<string | null>(null);
  const [valueCenterType, setValueCenterType] = React.useState<string | null>(null);
  const [valueServices, setValueServices] = React.useState<string | null>(null);

  useEffect(() => {
    cargaInicial();
  }, []);

  useEffect(() => {
    filterSmileCenters(valueCountry, valueCenterType, valueServices);
  }, [valueCountry, valueCenterType, valueServices]);

  const cargaInicial = async () => {
    const allData = await getAllSmileCenters();
    setSmileCenters(allData);
    setFilteredCenters(allData);

    const countries = await getMoonsCountries(allData);
    setCountries(countries);

    const centerTypes = await getMoonsCenterType(allData);
    setCenterTypes(centerTypes);

    const services = await getMoonsServices(allData);
    setServices(services);
  };

  const getAllSmileCenters = async (): Promise<allSmileCenters[]> => {
    const query = new Parse.Query("SmileCenters");
    // query.limit(10);
    query.ascending("Center_Name");
    try {
      const results = await query.find();
      const smileCenters: allSmileCenters[] = results.map((result) => {
        const smileCenter = result.toJSON();
        return {
          objectId: smileCenter.objectId,
          Center_Name: smileCenter.Center_Name,
          Zone: smileCenter.Zone,
          Services: smileCenter.Services,
          Calendar_Id: smileCenter.Calendar_Id,
          Apointment_Type_Id: smileCenter.Appointment_Type_Id,
          Moons_Center: smileCenter.Moons_Center,
          Center_Type: smileCenter.Center_Type,
          Street: smileCenter.Street,
          City: smileCenter.City,
          Neighborhood: smileCenter.Neighborhood,
          Region: smileCenter.Region,
          State: smileCenter.State,
          Country: smileCenter.Country,
          Notes: smileCenter.Notes,
          Center_Desc: smileCenter.Center_Desc,
          Apt: smileCenter.Apt,
          Map_URL: smileCenter.Map_URL,
          Phone: smileCenter.Phone,
          promo: smileCenter.promo,
          whatsAppLink: smileCenter.whatsAppLink,
          Timetable: smileCenter.Timetable,
        };
      });
      return smileCenters;
    } catch (error: unknown) {
      console.error("Error obtener SmileCenters", error);
      return [];
    }
  };

  const getMoonsCountries = async (allData: allSmileCenters[]): Promise<Country[]> => {
    const countrySet = new Set<string>();

    allData.forEach((center) => {
      if (center.Country) {
        countrySet.add(center.Country);
      }
    });

    const uniqueCountries: Country[] = Array.from(countrySet).map((country) => ({
      label: country,
      id: country,
      type: "country",
    }));

    return uniqueCountries;
  };

  const getMoonsCenterType = async (allData: allSmileCenters[]): Promise<CenterType[]> => {
    const centerTypeSet = new Set<string>();

    allData.forEach((center) => {
      if (center.Center_Type) {
        centerTypeSet.add(center.Center_Type);
      }
    });

    const uniqueCenterTypes: CenterType[] = Array.from(centerTypeSet).map(
      (type) => ({
        label: type,
        id: type,
        type: "centerType",
      }),
    );

    return uniqueCenterTypes;
  };

  const getMoonsServices = async (allData: allSmileCenters[]): Promise<ServiceData[]> => {
    const serviceSet = new Set<string>();

    allData.forEach((center) => {
      if (center.Services) {
        Object.keys(center.Services).forEach((key) => serviceSet.add(key));
      }
    });

    const servicesArray: ServiceData[] = Array.from(serviceSet).map((service) => ({
      label: service,
      id: service,
    }));
    return servicesArray;
  };

  const handleCountryChange = (country: Country | null) => {
    setValueCountry(country?.label || null);
  };

  const handleCenterTypeChange = (value: CenterType | null) => {
    setValueCenterType(value?.label || null);
  };

  const handleServicesChange = (value: ServiceData | null) => {
    setValueServices(value?.label || null);
  };

  const filterSmileCenters = async (country: string | null, centerType: string | null, service: string | null) => {
    let filtered = smileCenters;

    if (country) {
      filtered = filtered.filter(center => center.Country === country);
      const centerTypes = await getMoonsCenterType(filtered);
      setCenterTypes(centerTypes);
    } else {
      const centerTypes = await getMoonsCenterType(smileCenters);
      setCenterTypes(centerTypes);
    }

    if (centerType) {
      filtered = filtered.filter(center => center.Center_Type === centerType);
      const countries = await getMoonsCountries(filtered);
      setCountries(countries);
    } else {
      const countries = await getMoonsCountries(smileCenters);
      setCountries(countries);
    }

    if (service) {
      filtered = filtered.filter(center => 
        Object.values(center.Services).some(s => s.productId === service)
      );
      const centerTypes = await getMoonsCenterType(filtered);
      setCenterTypes(centerTypes);
      const countries = await getMoonsCountries(filtered);
      setCountries(countries);
    } else {
      const centerTypes = await getMoonsCenterType(smileCenters);
      setCenterTypes(centerTypes);
      const countries = await getMoonsCountries(smileCenters);
      setCountries(countries);
    }

    setFilteredCenters(filtered);
  };

  return (
    <>
      <Container className='mb-10'>
        <Header />
        <Filter countries={countries} centerTypes={centerTypes} services={services} onCountryChange={handleCountryChange} onCenterTypeChange={handleCenterTypeChange} onServicesChange={handleServicesChange} />
        <Detalle listaCentros={filteredCenters} />
        <CardComponent listaCentros={filteredCenters} />
      </Container>
    </>
  );
}

export default App;
