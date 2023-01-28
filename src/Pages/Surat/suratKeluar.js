import { useEffect, useState } from "react";
import { Loading } from "../../Components/Loading";
import { Navigation } from "../../Components/Navigation";
import { Table } from "../../Components/Table";
import { getSuratKeluar, getSuratMasuk } from "../../Services/api";

export const SuratKeluar = () => {
  const [suratKeluar, setSuratKeluar] = useState([]);
  const [loading, setLoading] = useState(true);
  const thead = [
    "No",
    "Tanggal",
    "ID Surat Keluar",
    "No Surat",
    "Perihal Surat",
    "Tujuan",
  ];
  useEffect(() => {
    const arrSuratKeluar = [];
    getSuratKeluar()
      .then((result) => {
        result.data && result.data.map((element, index) => {
          const tempArr = [
            index + 1,
            element.tglSurat,
            element.idSuratKeluar,
            element.noSurat,
            element.perihalSurat,
            element.tujuan,
          ];

          arrSuratKeluar.push(tempArr);
        });
        setSuratKeluar(arrSuratKeluar);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSuratKeluar([])
      });
  }, []);

  return (
    <Navigation name={"Surat Keluar"}>
      <div className="mt-14">
      {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading height={200} width={200} />
          </div>
        ) : suratKeluar.length === 0 ? (
          <div className="flex w-full h-96 justify-center items-center">
            <h1>Data Surat Keluar Belum Ada</h1>
          </div>
        ) : (
          <Table thead={thead} tbody={suratKeluar} name="surat keluar" />
        )}
      </div>
    </Navigation>
  );
};
