import React, { useState } from "react";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import PropTypes from "prop-types";
import { login } from "../../Services/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { requestForToken } from "../../Services/firebase";
import BgLogin from "../../assets/img/bg-login.png";
import LogoWhite from "../../assets/img/logo-white.png";
import { Loading } from "../../Components/Loading";
import { InputError } from "../../Components/Input/InputError";
import localForage from 'localforage'

export const Login = ({ setToken, setUser }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    formErrors: { email: "", password: "" },
  });

  const swalAlert = withReactContent(Swal);
  const [loading, setLoading] = useState(false);

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (validation()) {
      setLoading(false);
      swalAlert.fire({
        title: "Oops...! Ada sesuatu yang salah!",
        text: "Kesalahan input data",
        icon: "error",
      });
    } else {
      login(data.email, data.password)
        .then((response) => {
          if (response.result.isTrue) {
            const dataUser = response.result.dataUser[0];
            dataUser["email"] = data.email;
            setToken({ token: response.token });
            setUser({
              user: dataUser,
            });

            requestForToken(data.email, dataUser.role);
            localForage.setItem('email', data.email)
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if(err.response.status == 403 || err.response.status == 404){
            swalAlert.fire({
              title: "Oops...! Ada sesuatu yang salah!",
              text: err.response.data.messages,
              icon: "error",
            });
          }
        });
    }
  };

  const validation = () => {
    let fieldValidationError = data.formErrors;

    if (!data.email.trim()) {
      fieldValidationError.email = "Email wajib diisi";
    } else if (!data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      fieldValidationError.email = "Email tidak valid";
    } else {
      fieldValidationError.email = "";
    }

    if (!data.password.trim()) {
      fieldValidationError.password = "Password wajib diisi";
    } else {
      fieldValidationError.password = "";
    }

    setData({
      ...data,
      formErrors: fieldValidationError,
    });

    if (data.formErrors.email || data.formErrors.password) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      {loading ? (
        <div className="absolute flex items-center top-0 left-0 bottom-0 right-0">
          <Loading width={200} height={200} />
        </div>
      ) : null}
      <div className="flex flex-col items-center justify-center h-full w-full text-white bg-indigo-700">
        <div className="flex-1 flex justify-center items-center">
          <img src={LogoWhite} className="h-32" alt="logo aplikasi" />
        </div>

        <div className="flex-1">
          <img src={BgLogin} className="w-full" alt="background login" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-5">
        <div className="w-9/12">
          <div className="text-gray-600">
            <p className="text-3xl font-bold">Hallo Selamat Datang!</p>
            <p className="text-lg font-medium">Silahkan Masukan Data Anda</p>
          </div>

          <div className="my-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <Input
                  label="Email"
                  type="text"
                  name="email"
                  style={`${
                    data.formErrors.email ? "border-2 border-red-400" : ""
                  }`}
                  value={data.email}
                  onChange={onChangeField}
                />
                <InputError text={data.formErrors.email} />
              </div>

              <div>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  style={`${
                    data.formErrors.password ? "border-2 border-red-400" : ""
                  }`}
                  value={data.password}
                  onChange={onChangeField}
                />
                <InputError text={data.formErrors.password} />
              </div>

              <Button
                name="Masuk"
                style="w-full bg-indigo-700 hover:bg-indigo-800"
                textStyle="text-white"
              />

              <div className="flex justify-center">
                <p className="text-gray-600">
                  Belum punya akun?{" "}
                  <a href="#" className="font-bold text-indigo-700">
                    Registrasi
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.prototype = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
