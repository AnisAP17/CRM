import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const columns = [
  { id: "time", label: "Дата заказа", minWidth: 80, align: "center" },
  { id: "name", label: "ФИ", minWidth: 130, align: "center" },
  {
    id: "telephone",
    label: "Номер телефона",
    minWidth: 130,
    align: "center",
  },
  {
    id: "email",
    label: "Почта",
    minWidth: 130,
    align: "center",
  },
  {
    id: "products",
    label: "Изделия",
    minWidth: 130,
    align: "center",
  },
  {
    id: "price",
    label: "Стоимость",
    minWidth: 100,
    align: "center",
  },
];

export default function StickyHeadTable() {
  const [allIncome, setAllIncome] = React.useState([]);

  const rows = allIncome;

  React.useEffect(() => {
    fetch("http://localhost:4001/allIncome")
      .then((response) => response.json())
      .then((json) => setAllIncome(json));
  }, []);

  const deleteIncome = (id) => {
    fetch(`http://localhost:4001/deleteIncome/${id}`, {
      method: "DELETE",
    });
    setAllIncome(allIncome.filter((app) => app.id !== id));
    window.location.reload();
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        </>
                      );
                    })}
                    <TableCell
                      className="HighlightOffIcon"
                      onClick={() => deleteIncome(row.id)}
                    >
                      <HighlightOffIcon />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
