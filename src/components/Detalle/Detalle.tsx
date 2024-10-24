import React from "react";

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

const Detalle = ({ listaCentros }: { listaCentros: allSmileCenters[] }) => {
  const filteredCenters = listaCentros; // Assuming you want to use the listaCentros directly

  return (
    <div className="grid mt-4">
      <span>Centros de Sonrisas</span>
      <span>Total de resultados: {filteredCenters.length}</span>
    </div>
  );
}

export default Detalle;