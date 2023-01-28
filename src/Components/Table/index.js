import { Link } from "react-router-dom";

export const Table = (props) => {
  return (
    <div className="overflow-x-auto min-w-full rounded-lg mt-4">
      <table className="min-w-full text-center text-black bg-opacity-5 bg-black">
        <TableHead data={props.thead} />
        <TableBody data={props.tbody} name={props.name}/>
      </table>
    </div>
  );
};

const TableHead = (props) => {
  return (
    <thead className="text-base bg-opacity-5 bg-black">
      <tr>
        {props.data.map((element, i) => {
          return (
            <th scope="col" className="py-3" key={i}>
              {element}
            </th>
          );
        })}
        <th className="w-32">
          Aksi
        </th>
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  return (
    <tbody className="text-black">
      {props.data.map((element, index) => {
        return (
          <tr className="border-b" key={index}>
            {element.map((value) => {
              return <td className="py-4" key={value}>{value}</td>;
            })}

            <td className="py-4 text-center">
              <Link
                to={`${props.name == "surat masuk" ? "/detailSuratMasuk/": "/detailSuratKeluar/"}` + element[2]}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Detail
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
