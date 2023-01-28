import React, { useEffect, useState } from "react";
import { Navigation } from "../../Components/Navigation";
import { Table } from "../../Components/Table";
import { Button } from "../../Components/Button";
import { Link } from "react-router-dom";
import { getSuratMasuk } from "../../Services/api";
import { useUser } from "../Login/session";
import { Badge } from "../../Components/Badge";
import { Loading } from "../../Components/Loading";

export const PengajuanSurat = () => {
  const { user } = useUser();
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [loading, setLoading] = useState(true);
  const thead = [
    "No",
    "Tanggal",
    "ID Surat",
    "No Surat",
    "Perihal Surat",
    "Status",
  ];

  useEffect(() => {
    const arrSuratMasuk = [];
    getSuratMasuk(user.email)
      .then((result) => {
        result.data && result.data.map((element, index) => {
          const tempArr = [
            index + 1,
            element.tglSurat,
            element.idSuratMasuk,
            element.noSurat,
            element.perihalSurat,
            element.tglDiterima === "" ? (
              <Badge
                text={"Proses"}
                style={
                  "text-white bg-yellow-400 hover:bg-yellow-500"
                }
              />
            ) : (
              <Badge
                text={"Selesai"}
                style={
                  "text-white bg-emerald-600 hover:bg-emerald-700"
                }
              />
            ),
          ];

          arrSuratMasuk.push(tempArr);
        });
        setLoading(false);
        setSuratMasuk(arrSuratMasuk);
      })
      .catch((err) => {
        setLoading(false);
        setSuratMasuk([])
      });
  }, []);

  return (
    <Navigation name={"Surat Masuk"}>
      <div className="mt-14">
        <div className="flex">
          <Link to={"/tambahsuratmasuk"}>
            <Button
              name="Tambah Pengajuan"
              style="bg-indigo-700 hover:bg-indigo-800"
              textStyle="text-white text-base"
            />
          </Link>
        </div>

        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading height={200} width={200} />
          </div>
        ) : suratMasuk.length === 0 ? (
          <div className="flex w-full h-96 justify-center items-center">
            <h1>Data Pengajuan Surat Belum Ada</h1>
          </div>
        ) : (
          <Table thead={thead} tbody={suratMasuk} name="surat masuk" />
        )}
      </div>
    </Navigation>
  );
};
