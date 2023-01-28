import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";
import { TambahSuratMasuk } from "./Pages/Surat/tambahSuratMasuk";
import { useToken, useUser } from "./Pages/Login/session";
import Notification from "./Components/Notifications";
import { SuratKeluar } from "./Pages/Surat/suratKeluar";
import { SuratMasuk } from "./Pages/Surat/suratMasuk";
import { DetailSuratMasuk } from "./Pages/Surat/detailSuratMasuk";
import { TambahSuratKeluar } from "./Pages/Surat/tambahSuratKeluar";
import { DetailSuratKeluar } from "./Pages/Surat/detailSuratKeluar";
import { PengajuanSurat } from "./Pages/Surat/pengajuanSurat";
import { Profile } from "./Pages/Profile/Profile";
import { Worke } from "@react-pdf-viewer/core";

function App() {
  const { token, setToken } = useToken();
  const { user, setUser } = useUser();
  if (!token) {
    return <Login setToken={setToken} setUser={setUser} />;
  }

  return (
    <div className="App">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js" />
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pengajuansurat" element={<PengajuanSurat />} />
          <Route path="/tambahsuratmasuk" element={<TambahSuratMasuk />} />
          <Route
            path="/tambahsuratkeluar/:id/:tujuan"
            element={<TambahSuratKeluar />}
          />
          <Route path="/suratmasuk" element={<SuratMasuk />} />
          <Route path="/suratkeluar" element={<SuratKeluar />} />
          <Route path="/detailSuratMasuk/:id" element={<DetailSuratMasuk />} />
          <Route
            path="/detailSuratKeluar/:id"
            element={<DetailSuratKeluar />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
