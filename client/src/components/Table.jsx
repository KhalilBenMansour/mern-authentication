import data from "../../MOCK_DATA.json";

const Table = () => {
  let keys = Object.keys(data[0]);
  console.log(keys);

  return (
    <table id="example" className="display" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, i) => {
          return (
            <tr key={e.name + i}>
              <td>{e.name}</td>
              <td>{e.postion}</td>
              <td>{e.office}</td>
              <td>{e.age}</td>
              <td>{e.start_date}</td>
              <td>{e.salary}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
