import { useEffect, useState } from "react";
import { Badge } from "../../Components/Badge";
import { Loading } from "../../Components/Loading";
import { Navigation } from "../../Components/Navigation";
import { Table } from "../../Components/Table";
import { getSuratMasuk } from "../../Services/api";

export const SuratMasuk = () => {
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [loading, setLoading] = useState(true);
  const thead = [
    "No",
    "Tanggal",
    "ID Surat",
    "No Surat",
    "Perihal Surat",
    "Status",
    "Pengirim",
  ];
  useEffect(() => {
    const arrSuratMasuk = [];
    getSuratMasuk("admin")
      .then((result) => {
        result.data &&
          result.data.map((element, index) => {
            const tempArr = [
              index + 1,
              element.tglSurat,
              element.idSuratMasuk,
              element.noSurat,
              element.perihalSurat,
              element.tglDiterima === "" ? (
                <Badge
                  text={"Proses"}
                  style={"text-white bg-yellow-400 hover:bg-yellow-500 text-sm"}
                />
              ) : (
                <Badge
                  text={"Selesai"}
                  style={
                    "text-white bg-emerald-600 hover:bg-emerald-700 text-sm"
                  }
                />
              ),
              element.pengirim,
            ];
            arrSuratMasuk.push(tempArr);
          });
        setSuratMasuk(arrSuratMasuk);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        setSuratMasuk([])
      });
  }, []);

  return (
    <Navigation name={"Surat Masuk"}>
      <div className="mt-14">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading height={200} width={200} />
          </div>
        ) : suratMasuk.length === 0 ? (
          <div className="flex w-full h-96 justify-center items-center">
            <h1>Data Surat Masuk Belum Ada</h1>
          </div>
        ) : (
          <Table thead={thead} tbody={suratMasuk} name="surat masuk" />
        )}
      </div>
    </Navigation>
  );
};
