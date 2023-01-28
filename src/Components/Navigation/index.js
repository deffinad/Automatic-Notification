import { Link, useLocation } from "react-router-dom";
import { useUser, logout, detectMob } from "../../Pages/Login/session";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faArrowLeft,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getMessages, updateStatus, updateToken } from "../../Services/api";
import Logo from "../../assets/img/logo.png";
import { Loading } from "../Loading";
import LogoProfile from "../../assets/img/img-profile.png";
import { Badge } from "../Badge";

export const Navigation = ({ children, name }) => {
  const { user } = useUser();
  const [sidebarNotifOpen, setSidebarNotif] = useState(false);
  const [sidebarMainOpen, setSidebarMain] = useState(false);
  const [notification, setNotification] = useState({
    notifSemua: [],
    notifBelum: [],
    notifSudah: [],
    activeNotif: "semua",
    countNotifIn: 0,
  });

  const [loading, setLoading] = useState(true);

  const openSidebarNotif = () => {
    setSidebarNotif(!sidebarNotifOpen);
  };

  const openSidebarMain = () => {
    setSidebarMain(!sidebarMainOpen);
  };

  const handleLogout = () => {
    const check = detectMob();
    const email = user.email;
    const role = user.role;
    updateToken(email, "", check, role)
      .then((response) => {
        console.log(response.messages);
      })
      .catch((err) => {
        console.log(err);
      });
    logout();
    window.location.href = "/";
  };

  const clickFilterNotif = (filter) => {
    setLoading(true);
    const filterItem = notification.notifSemua.filter((item) => {
      if (filter === "semua") {
        return item;
      } else if (filter === "belum dibaca") {
        return item.read === false;
      } else {
        return item.read === true;
      }
    });
    const dataNotif =
      filter === "semua"
        ? "notifSemua"
        : filter === "belum dibaca"
        ? "notifBelum"
        : "notifSudah";
    setNotification({
      ...notification,
      ["activeNotif"]: filter,
      [dataNotif]: filterItem,
    });

    setLoading(false);
  };

  useEffect(() => {
    getMessages(
      user.email,
      user.role === "admin" ? "suratmasuk" : "suratkeluar"
    )
      .then((response) => {
        setLoading(false);
        const newNotif = response.data.filter((count) => {
          return count.read === false;
        });
        setNotification({
          ...notification,
          ["notifSemua"]: response.data,
          ["countNotifIn"]: newNotif.length,
        });
      })

      .catch((err) => {
        setLoading(false);
        setNotification({
          ...notification,
          ["notifSemua"]: [],
        });
      });
  }, []);

  const clickNotification = (data) => {
    updateStatus(user.email, data)
      .then((response) => {
        window.location.href = `${data.route}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="relative min-h-screen md:flex overflow-x-hidden bg-black bg-opacity-5"
      data-dev-hint="container"
    >
      <header
        className="bg-white text-gray-600 px-4 py-3 drop-shadow-2xl flex justify-between md:hidden"
        data-dev-hint="mobile menu bar"
      >
        <div className="block text-gray-600 font-bold whitespace-nowrap truncate">
          <img src={Logo} className="w-28" />
        </div>

        <div className="flex flex-row gap-3">
          <div
            onClick={openSidebarNotif}
            className={`my-2 p-2 focus:outline-none text-gray-600 transition duration-500 hover:text-white hover:bg-indigo-700 rounded-md`}
          >
            <div className={`h-6 w-6 flex items-center justify-center`}>
              <FontAwesomeIcon icon={faBell} size={"lg"} />
            </div>
          </div>

          <div
            onClick={openSidebarMain}
            className={`${
              sidebarMainOpen ? "bg-indigo-700 text-white" : ""
            } my-2 p-2 focus:outline-none text-gray-600 transition duration-500 hover:text-white hover:bg-indigo-700 rounded-md`}
          >
            <div
              className={`${
                sidebarMainOpen ? "hidden" : "block"
              } h-6 w-6 flex items-center justify-center`}
            >
              <FontAwesomeIcon icon={faBars} size={"lg"} />
            </div>
            <div
              className={`${
                sidebarMainOpen ? "block" : "hidden"
              } h-6 w-6 flex items-center justify-center`}
            >
              <FontAwesomeIcon icon={faXmark} size={"2x"} />
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`${
          sidebarMainOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          sidebarNotifOpen ? "-translate-x-full" : "md:translate-x-0"
        } bg-white text-gray-600 drop-shadow-2xl z-20 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform lg:fixed  transition duration-700 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto`}
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex flex-col space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <div
            className="text-gray-600 flex items-center font-bold justify-center space-x-2 py-4 px-4"
            title="Tata Surat"
          >
            <img src={Logo} className="w-40" />
          </div>

          <nav data-dev-hint="main navigation">
            <SideNavigation name="Dashboard" link="/" />
            {user.role === "admin" ? (
              <>
                <SideNavigation name="Surat Masuk" link="/suratmasuk" />
                <SideNavigation name="Surat Keluar" link="/suratkeluar" />
              </>
            ) : (
              <SideNavigation name="Pengajuan Surat" link="/pengajuansurat" />
            )}
            <SideNavigation name="Profil" link="/profile" />
          </nav>
        </div>

        <nav
          data-dev-hint="second-main-navigation or footer navigation"
          className="text-center"
        >
          <button
            onClick={handleLogout}
            className="py-4 px-4 transition duration-500 hover:font-bold"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main
        id="content"
        className={`${
          sidebarNotifOpen ? "md:mr-96" : "md:ml-64"
        }  flex-1 p-6 lg:px-10 transition-all duration-700`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="px-4 py-6 sm:px-0">
            {/* NAVBAR */}
            <div className="flex flex-row">
              <div className="flex-1 text-gray-600">
                <h1>{name}</h1>
              </div>

              <div
                className={`${
                  sidebarNotifOpen ? "hidden" : "md:block"
                } flex-nowrap transition-all duration-700 hidden`}
              >
                <button
                  onClick={openSidebarNotif}
                  className="rounded-full relative bg-white w-10 h-10 flex justify-center items-center shadow-md transition duration-700 text-gray-600 hover:text-indigo-700"
                >
                  {notification.countNotifIn > 0 ? (
                    <div className="absolute w-[10px] h-[10px] rounded-full z-10 bg-red-500 top-[7px] right-[8px]"></div>
                  ) : null}
                  <FontAwesomeIcon icon={faBell} size="lg" />
                </button>
              </div>
            </div>

            {children}
          </div>
        </div>
      </main>

      <aside
        className={`${
          sidebarNotifOpen ? "" : "translate-x-full"
        } bg-white text-gray-600 rounded-tl-2xl z-20 drop-shadow-2xl md:w-96 w-3/4 pt-2 inset-y-0 right-0 transform fixed transition duration-700 ease-in-out flex flex-col h-screen`}
      >
        <button
          onClick={openSidebarNotif}
          className="w-10 h-10 flex justify-center items-center transition duration-700 text-bold hover:text-indigo-700"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </button>

        <div className="header-notif shadow-md">
          <p className="font-black ml-4 my-5 text-xl mb-8">Notifications</p>

          <div className="filter-notif flex text-sm font-semibold text-gray-600">
            <div
              className={`${
                notification.activeNotif === "semua"
                  ? "active text-indigo-700"
                  : "text-gray-600"
              } item flex-1 flex flex-row`}
              onClick={() => clickFilterNotif("semua")}
            >
              <span className="">Semua</span>
              {notification.countNotifIn !== 0 ? (
                <Badge
                  text={notification.countNotifIn}
                  style="bg-indigo-700 text-white text-xs ml-1"
                />
              ) : null}
            </div>
            <div
              className={`${
                notification.activeNotif === "belum dibaca"
                  ? "active text-indigo-700"
                  : "text-gray-600"
              } item flex-1`}
              onClick={() => clickFilterNotif("belum dibaca")}
            >
              <p>Belum Dibaca</p>
            </div>
            <div
              className={`${
                notification.activeNotif === "sudah dibaca"
                  ? "active text-indigo-700"
                  : "text-gray-600"
              } item flex-1`}
              onClick={() => clickFilterNotif("sudah dibaca")}
            >
              <p>Sudah Dibaca</p>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-1 relative">
          <div
            className={`${
              notification.activeNotif === "semua"
                ? "translate-x-0"
                : "translate-x-full"
            } z-20 mt-0 divide-y-2 overflow-y-auto absolute top-0 left-0 bg-white right-0 bottom-0 transition duration-700 ease-in-out`}
          >
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loading height={150} width={150} />
              </div>
            ) : notification.notifSemua.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <h1>Data Notifikasi Tidak Ada</h1>
              </div>
            ) : (
              notification.notifSemua.map((element, index) => {
                return (
                  <a
                    onClick={() => clickNotification(element)}
                    key={index}
                    className="cursor-pointer"
                  >
                    <div
                      className={`${
                        !element.read ? "bg-slate-50" : ""
                      } item flex flex-row p-5 hover:bg-slate-50 hover:transition hover:duration-300`}
                    >
                      <div className="flex justify-center items-center">
                        <img
                          className="rounded-lg w-12 h-12"
                          src={LogoProfile}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-center flex-1 ml-4">
                        <p className="text-[12px]">{element.sender}</p>
                        <p className="text-sm font-bold mt-1">
                          {element.title}
                        </p>
                        <p className="text-[13px]">{element.body}</p>
                      </div>

                      <div className="flex flex-col justify-center items-end ml-4">
                        <p className="text-[12px]">{element.createdAt}</p>
                      </div>
                    </div>
                  </a>
                );
              })
            )}
          </div>

          <div
            className={`${
              notification.activeNotif === "belum dibaca"
                ? "translate-x-0"
                : "translate-x-full"
            } z-20 mt-0 divide-y-2 overflow-y-auto absolute top-0 left-0 right-0 bottom-0 bg-white transition duration-700 ease-in-out`}
          >
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loading height={150} width={150} />
              </div>
            ) : notification.notifBelum.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <h1>Data Notifikasi Tidak Ada</h1>
              </div>
            ) : (
              notification.notifBelum.map((element, index) => {
                return (
                  <a
                    onClick={() => clickNotification(element)}
                    key={index}
                    className="cursor-pointer"
                  >
                    <div className="item flex flex-row p-5 hover:bg-slate-50 hover:transition hover:duration-300">
                      <div className="flex justify-center items-center">
                        <img
                          className="rounded-lg w-12 h-12"
                          src={LogoProfile}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-center flex-1 ml-4">
                        <p className="text-[12px]">{element.sender}</p>
                        <p className="text-sm font-bold mt-1">
                          {element.title}
                        </p>
                        <p className="text-[13px]">{element.body}</p>
                      </div>

                      <div className="flex flex-col justify-center items-end ml-4">
                        <p className="text-[12px]">{element.createdAt}</p>
                      </div>
                    </div>
                  </a>
                );
              })
            )}
          </div>

          <div
            className={`${
              notification.activeNotif === "sudah dibaca"
                ? "translate-x-0"
                : "translate-x-full"
            } z-20 mt-0 divide-y-2 overflow-y-auto absolute top-0 left-0 right-0 bottom-0 bg-white transition duration-700 ease-in-out`}
          >
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loading height={150} width={150} />
              </div>
            ) : notification.notifSudah.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <h1>Data Notifikasi Tidak Ada</h1>
              </div>
            ) : (
              notification.notifSudah.map((element, index) => {
                return (
                  <a
                    onClick={() => clickNotification(element)}
                    key={index}
                    className="cursor-pointer"
                  >
                    <div className="item flex flex-row p-5 hover:bg-slate-50 hover:transition hover:duration-300 ">
                      <div className="flex justify-center items-center">
                        <img
                          className="rounded-lg w-12 h-12"
                          src={LogoProfile}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-center flex-1 ml-4">
                        <p className="text-[12px]">{element.sender}</p>
                        <p className="text-sm font-bold mt-1">
                          {element.title}
                        </p>
                        <p className="text-[13px]">{element.body}</p>
                      </div>

                      <div className="flex flex-col justify-center items-end ml-4">
                        <p className="text-[12px]">{element.createdAt}</p>
                      </div>
                    </div>
                  </a>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

const SideNavigation = (props) => {
  var isActive = useLocation().pathname === props.link;
  var active = isActive ? "active" : "";

  return (
    <Link to={props.link}>
      <div
        key={props.name}
        className={`${
          active
            ? "bg-indigo-700 text-indigo-700 bg-opacity-10 font-bold"
            : "hover:bg-indigo-700 hover:text-white"
        }  flex mx-4 my-3 items-center space-x-2 py-2 px-4 transition duration-500 rounded-lg cursor-pointer`}
      >
        <span className="ml-6">{props.name}</span>
      </div>
    </Link>
  );
};
