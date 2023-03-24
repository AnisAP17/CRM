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
  { id: "name", label: "Название", minWidth: 180, align: "center",},
  { id: "description", label: "Описание", minWidth: 200, align: "center",},
  {
    id: "price",
    label: "Цена",
    minWidth: 200,
    align: "center",
  },
  {
    id: "time",
    label: "Дата",
    minWidth: 100,
    align: "center",
  },
];

export default function StickyHeadTable() {
  const [allExpenses, setAllExpenses] = React.useState([]);

  const rows = allExpenses;

  React.useEffect(() => {
    fetch("http://localhost:4001/allExpenses")
      .then((response) => response.json())
      .then((json) => setAllExpenses(json));
  }, []);

  const deleteExpenses = (id) => {
    fetch(`http://localhost:4001/deleteExpenses/${id}`, {
      method: "DELETE",
    });
    setAllExpenses(allExpenses.filter((app) => app.id !== id));
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
                      onClick={() => deleteExpenses(row.id)}
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
