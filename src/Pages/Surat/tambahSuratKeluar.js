import { useState } from "react";
import { Input } from "../../Components/Input";
import { Navigation } from "../../Components/Navigation/";
import { useUser } from "../Login/session";
import { Card } from "../../Components/Card";
import { useParams } from "react-router-dom";
import { Button } from "../../Components/Button";
import { addNotification, postSuratKeluar } from "../../Services/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Loading } from "../../Components/Loading";
import { InputError } from "../../Components/Input/InputError";
import { Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";

export const TambahSuratKeluar = () => {
  const [url, setUrl] = useState("");
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  const { user } = useUser();
  const { id, tujuan } = useParams();
  const swalAlert = withReactContent(Swal);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    idSuratKeluar: "",
    idSuratMasuk: id,
    pengirim: user.email,
    tujuan: tujuan,
    tglSurat: "",
    sifatSurat: "",
    noSurat: "",
    perihalSurat: "",
    fileSurat: "",
    keterangan: "",
    formErrors: {
      idSuratKeluar: "",
      tglSurat: "",
      sifatSurat: "",
      noSurat: "",
      perihalSurat: "",
      fileSurat: "",
    },
  });

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "fileSurat") {
      onChangeFile(e.target.files);
    }
    
    setData({
      ...data,
      [name]: value,
    });
  };

  const onChangeFile = (files) => {
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if(validation()){
      setLoading(false)
      swalAlert.fire({
        title: "Oops...! Ada sesuatu yang salah!",
        text: "Kesalahan input data",
        icon: "error",
      });
    }else{
      postSuratKeluar(data)
        .then((response) => {
          if(response){
            swalAlert
              .fire({
                title: "Yay! Form berhasil diupload!",
                text: response.messages,
                icon: "success",
                showCancelButton: true,
                showConfirmButton: true,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  window.location.href =
                    "/detailSuratKeluar/" + data.idSuratKeluar;
                }
              });
            setLoading(false);
            handleReset();

            const notification = {
              appName: "TataSurat",
              title: data.perihalSurat,
              body: data.keterangan,
              sender: data.pengirim,
              to: data.tujuan,
              route: "/detailSuratMasuk/" + data.idSuratMasuk,
            };

            addNotification(notification);
          }
        })
        .catch((err) => {
          setLoading(true);
          console.log(err);
          swalAlert.fire({
            title: "Oops...! Ada sesuatu yang salah!",
            text: "Data gagal diupload",
            icon: "error",
          });
          setLoading(false);
        });
    }
  };

  const handleReset = () => {
    setData({
      idSuratKeluar: "",
      idSuratMasuk: id,
      pengirim: user.email,
      tujuan: tujuan,
      tglSurat: "",
      sifatSurat: "",
      noSurat: "",
      perihalSurat: "",
      fileSurat: "",
      keterangan: "",
    });

    document.getElementById("form-surat-keluar").reset();
  };

  const validation = () => {
    let fieldValidationError = data.formErrors;

    if (!data.idSuratKeluar.trim()) {
      fieldValidationError.idSuratKeluar = "ID surat keluar wajib diisi";
    } else {
      fieldValidationError.idSuratKeluar = "";
    }

    if (!data.tglSurat.trim()) {
      fieldValidationError.tglSurat = "Tanggal surat wajib diisi";
    } else {
      fieldValidationError.tglSurat = "";
    }

    if (!data.sifatSurat.trim()) {
      fieldValidationError.sifatSurat = "Sifat surat wajib diisi";
    } else {
      fieldValidationError.sifatSurat = "";
    }

    if (!data.noSurat.trim()) {
      fieldValidationError.noSurat = "Nomor surat wajib diisi";
    } else {
      fieldValidationError.noSurat = "";
    }

    if (!data.perihalSurat.trim()) {
      fieldValidationError.perihalSurat = "Perihal surat wajib diisi";
    } else {
      fieldValidationError.perihalSurat = "";
    }

    if (!data.fileSurat.trim()) {
      fieldValidationError.fileSurat = "File surat wajib diisi";
    } else {
      fieldValidationError.fileSurat = "";
    }

    setData({
      ...data,
      formErrors: fieldValidationError,
    });

    if (
      data.formErrors.idSuratMasuk ||
      data.formErrors.tglSurat ||
      data.formErrors.sifatSurat ||
      data.formErrors.noSurat ||
      data.formErrors.fileSurat ||
      data.formErrors.perihalSurat
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Navigation name="Tambah Surat Keluar">
      <div className="mt-14 gap-10">
        <Card style="bg-white p-6 flex flex-col lg:flex-row relative">
          <div className="flex-1 p-6">
          {url ? (
              <div className="lg:h-[700px] h-[400px] w-full rpv-core__viewer">
                <div className="flex flex-row justify-center items-center bg-gray-50 p-2">
                  <ZoomOutButton />
                  <ZoomPopover />
                  <ZoomInButton />
                </div>
                <Viewer fileUrl={url} plugins={[zoomPluginInstance]} />
              </div>
            ) : (
              <div className="border-4 border-gray-200 border-dashed rounded-lg flex items-center justify-center lg:h-full h-[400px]">
                <p className="text-gray-300 text-xl">File Surat Keluar</p>
              </div>
            )}
          </div>
          <div className="flex-1 px-6 lg:pt-6 pt-0 lg:mt-0 mt-14">
            <form
              id="form-surat-keluar"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="flex lg:flex-row flex-col gap-4">
                <div className="flex-1">
                  <Input
                    label="ID Surat Keluar"
                    type="text"
                    name="idSuratKeluar"
                    style={`${
                      data.formErrors.idSuratKeluar
                        ? "border-2 border-red-400"
                        : ""
                    }`}
                    value={data.idSuratKeluar}
                    onChange={onChangeField}
                  />
                  <InputError text={data.formErrors.idSuratKeluar} />
                </div>
                <div className="flex-1">
                  <Input
                    label="ID Surat Masuk"
                    type="text"
                    name="idSuratMasuk"
                    value={id}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="flex lg:flex-row flex-col gap-4">
                <div className="flex-1">
                  <Input
                    label="Pengirim"
                    type="text"
                    name="pengirim"
                    value={user.nama}
                    disabled={true}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="Tujuan"
                    type="text"
                    name="tujuan"
                    value={tujuan}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="flex lg:flex-row flex-col gap-4">
                <div className="flex-1">
                  <Input
                    label="Tanggal Surat"
                    type="date"
                    name="tglSurat"
                    style={`${
                      data.formErrors.tglSurat
                        ? "border-2 border-red-400"
                        : ""
                    }`}
                    value={data.tglSurat}
                    onChange={onChangeField}
                  />
                  <InputError text={data.formErrors.tglSurat} />
                </div>

                <div className="flex-1">
                  <Input
                    label="Sifat Surat"
                    type="text"
                    name="sifatSurat"
                    style={`${
                      data.formErrors.sifatSurat
                        ? "border-2 border-red-400"
                        : ""
                    }`}
                    value={data.sifatSurat}
                    onChange={onChangeField}
                  />
                  <InputError text={data.formErrors.sifatSurat} />
                </div>
              </div>

              <div className="flex-1">
                <Input
                  label="Nomor Surat"
                  type="text"
                  name="noSurat"
                  style={`${
                    data.formErrors.noSurat
                      ? "border-2 border-red-400"
                      : ""
                  }`}
                  value={data.noSurat}
                  onChange={onChangeField}
                />
                <InputError text={data.formErrors.noSurat} />
              </div>

              <div className="flex-1">
                <Input
                  label="Perihal Surat"
                  type="text"
                  name="perihalSurat"
                  style={`${
                    data.formErrors.perihalSurat
                      ? "border-2 border-red-400"
                      : ""
                  }`}
                  value={data.perihalSurat}
                  onChange={onChangeField}
                />
                <InputError text={data.formErrors.perihalSurat} />
              </div>

              <div className="flex-1">
                <Input
                  label="File Surat"
                  type="file"
                  name="fileSurat"
                  accept=".pdf"
                  style={`${
                    data.formErrors.fileSurat
                      ? "border-2 border-red-400"
                      : ""
                  }`}
                  value={data.fileSurat}
                  onChange={onChangeField}
                />
                <InputError text={data.formErrors.fileSurat} />
              </div>

              <div className="flex-1">
                <Input
                  label="Keterangan"
                  type="text"
                  style="h-28"
                  name="keterangan"
                  onChange={onChangeField}
                />
              </div>

              <div className="flex-1">
                <Button
                  name="Submit"
                  style="w-full bg-indigo-700 hover:bg-indigo-800"
                  textStyle="text-white"
                />
              </div>
            </form>
          </div>

          {loading ? (
            <div className="absolute flex items-center top-0 left-0 right-0 bottom-0">
              <Loading width={200} height={200} />
            </div>
          ) : null}
        </Card>
      </div>
    </Navigation>
  );
};
