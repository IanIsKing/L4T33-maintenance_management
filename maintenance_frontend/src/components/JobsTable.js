// This is the setup for the table that displays the jobs in the main view.
import React from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { FormatDate } from "../Utils/FormatDate";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

function JobsTable({ jobs, showModal, modalConfig, setSelection }) {
  // create the colums to be displayed in the table and the data to be displayed
  const columns = React.useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Date Submitted",
        accessor: "dateSubmitted",
        Cell: ({ value }) => FormatDate(value),
      },
    ],
    []
  );

  // Create the table with the data and columns and add the ability to sort the columns
  const data = React.useMemo(() => jobs, [jobs]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters, useSortBy);

  return (
    <Table {...getTableProps()} striped bordered hover>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
            {modalConfig.type === "batch_update" ? <th>X</th> : null}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              id={row.original._id}
              onClick={
                showModal ? () => showModal("update_job", row.original) : null
              }
              className={"Archived_" + row.original.archived}
            >
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className={cell.id}>
                    {cell.render("Cell")}
                  </td>
                );
              })}

              {modalConfig.type === "batch_update" ? (
                <td>
                  <Form.Check
                    id={"s" + row.original._id}
                    onChange={() => (
                      setSelection(row.original._id),
                      console.log("row.original._id", row.original._id)
                    )}
                    type="checkbox"
                  />
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default JobsTable;
