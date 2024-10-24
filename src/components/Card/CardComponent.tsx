import React from "react";
import { Card, CardContent, Tooltip } from "@mui/material";

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

const CardComponent = ({ listaCentros }: { listaCentros: allSmileCenters[] }) => {

  const filteredCenters = listaCentros;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {filteredCenters.map((center) => (
        <Card key={center.objectId} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <div className="flex gap-2">
              <div className="flex-none w-14 h-16 justify-center items-center">
                <img src="/logo192.png" alt="Moons Center" style={{ width: 50, height: 50 }} />
              </div>
              <div className="flex-none w-72">
                <article className="text-wrap">
                  <h3 className='text-amber-500 truncate'>{center.Center_Name}</h3>
                  <p className='text-sm text-red-400'>{center.promo}</p>
                  <p className='text-xs text-gray-400 truncate'>{center.Country}</p>
                  <p className='text-xs text-gray-400 truncate'>{center.Street}, {center.City}</p>
                  <p className='text-xs text-gray-400 truncate'>{center.Zone}</p>
                  <p className='text-xs text-gray-400 truncate'>{center.Neighborhood}</p>
                  <p className='text-xs text-gray-400'>{center.Center_Type}</p>
                  <p className='text-xs text-gray-400'>{center.Apointment_Type_Id ? `ATI: ${center.Apointment_Type_Id}` : ""}</p>
                  <p className='text-xs text-gray-400'>{center.Timetable ? `L-V ${center.Timetable.weekdays} / S ${center.Timetable.saturday}` : ""}</p>
                  {Object.keys(center.Services).length > 0 && (
                    <>
                      <div className="hidden md:block">
                        <Tooltip title={
                          <React.Fragment>
                            {Object.keys(center.Services).map((key) => (
                              <p key={key} className='text-sm'>{key}</p>
                            ))}
                          </React.Fragment>
                        }>
                          <p className='text-xs text-blue-600'>Ver Servicios</p>
                        </Tooltip>
                      </div>
                      <div className="block md:hidden bg-gray-100 pt-4 pb-4 w-40 rounded">
                        <p className='text-xs text-blue-600'>Servicios</p>
                        {Object.keys(center.Services).map((key) => (
                          <p key={key} className='text-xs'>{key}</p>
                        ))}
                      </div>
                    </>
                  )}
                </article>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CardComponent;