import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card } from ".";

export const CardDashboard = ({icon, text, count, iconSize,textSize}) => {
  return (
    <div>
      <Card style="relative w-24 h-24 bg-indigo-700 ml-4 p-2 z-10 flex items-center justify-center">
        <FontAwesomeIcon icon={icon} color="white" size={iconSize} />
      </Card>

      <Card style=" bg-white z-0 -mt-16 w-full h-40 py-5 px-6 flex flex-col gap-7">
        <div className="flex-1 flex items-center justify-end">
          <p className="text-gray-600 text-5xl font-bold">{count}</p>
        </div>
        <div className="flex-1">
          <p className={`${textSize} text-gray-600 font-semibold`}>
            {text}
          </p>
        </div>
      </Card>
    </div>
  );
};
