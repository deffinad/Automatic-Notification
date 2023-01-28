import React from "react";
import { Card } from "../../Components/Card";
import { Navigation } from "../../Components/Navigation";
import ImageProfile from "../../assets/img/img-profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationPin,
  faMailBulk,
  faPhone,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../Login/session";

export const Profile = () => {
  const { user } = useUser();
  return (
    <Navigation name={"Profil"}>
      <div className="mt-14">
        <Card style={"bg-white w-full md:h-[450px] rounded-lg"}>
          <div className="w-full h-full flex flex-col-reverse md:flex-row">
            <div className="px-8 pb-10 md:pb-0 md:py-8 flex-1 flex flex-col gap-10">
              <div className="flex flex-row gap-3 h-8 justify-start">
                <div className="w-[6px] bg-indigo-700"></div>
                <p className="flex items-center font-semibold text-xl text-gray-600">
                  Detail Pengguna
                </p>
              </div>

              <div className="flex-1 flex-col space-y-4">
                <div>
                  <p className="text-3xl font-bold ">{user.nama}</p>
                  <div className="flex flex-row gap-6 mt-3 mb-7">
                    <div>
                      <p className="font-medium text-sm text-gray-400">
                        Level Pengguna
                      </p>
                      <p className="font-semibold text-gray-700">{user.role}</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-400">
                        Jenis Kelamin
                      </p>
                      <p className="font-semibold text-gray-700">
                        {user.jenis_kelamin}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="text-gray-700 text-[24px] flex items-center">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-400">Email</p>
                    <p className="font-semibold text-gray-700">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="text-gray-700 text-[24px] flex items-center">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-400">
                      Nomor Telepon
                    </p>
                    <p className="font-semibold text-gray-700">
                      {user.no_telp}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="text-gray-700 text-[24px] flex items-center">
                    <FontAwesomeIcon icon={faLocationPin} />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-400">Alamat</p>
                    <p className="font-semibold text-gray-700">{user.alamat}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex md:flex-1 md:h-full h-80 w-full relative justify-center items-center">
              <img src={ImageProfile} className="rounded-xl w-48 h-48 md:w-64 md:h-64 z-10" />
              <div className="absolute z-0 bottom-0 right-0 hidden md:block bg-indigo-700 h-60 w-72 rounded-br-lg rounded-tl-[300px] "></div>
              <div className="absolute z-0 h-full top-0 left-0 bottom-0 block md:hidden bg-indigo-700 h-[170px] w-full rounded-tl-lg rounded-b-[50px] "></div>
            </div>
          </div>
        </Card>
      </div>
    </Navigation>
  );
};
