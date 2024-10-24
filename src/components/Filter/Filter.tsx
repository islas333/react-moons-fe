import React from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

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

interface FilterProps {
  countries: Country[];
  centerTypes: CenterType[];
  services: ServiceData[];
  onCountryChange: (country: Country | null) => void;
  onCenterTypeChange: (centerType: CenterType | null) => void;
  onServicesChange: (services: ServiceData | null) => void;
}

const Filter = ({ countries, centerTypes, services, onCountryChange, onCenterTypeChange, onServicesChange }: FilterProps) => {

  const handleCountryChange = (value: Country | null) => {
    onCountryChange(value);
  };

  const handleCenterTypeChange = (value: CenterType | null) => {
    onCenterTypeChange(value);
  };

  const handleServicesChange = (value: ServiceData | null) => {
    onServicesChange(value);
  };

  return (
    <div className="flex flex-col gap-4 mt-4 md:flex-row">
      <Autocomplete
        disablePortal
        options={countries}
        sx={{ width: '100%', maxWidth: 300 }}
        onChange={(event, value) => handleCountryChange(value)}
        renderInput={(params) => <TextField {...params} label="Selecciona Pais" />}
      />
      <Autocomplete
        disablePortal
        options={centerTypes}
        sx={{ width: '100%', maxWidth: 300 }}
        onChange={(event, value) => handleCenterTypeChange(value)}
        renderInput={(params) => <TextField {...params} label="Tipo de centro" />}
      />
      <Autocomplete
        disablePortal
        options={services}
        sx={{ width: '100%', maxWidth: 300 }}
        onChange={(event, value) => handleServicesChange(value)}
        renderInput={(params) => <TextField {...params} label="Servicios" />}
      />
    </div>
  );
}

export default Filter;