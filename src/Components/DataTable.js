import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

export default function DataTable(props) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>S_No.</TableCell>
                        <TableCell align="centre">Line of Business</TableCell>
                        <TableCell align="centre">Revenue Type</TableCell>
                        <TableCell align="centre">Product</TableCell>
                        <TableCell align="centre">Posting Period</TableCell>
                        <TableCell align="centre">ACV</TableCell>
                        <TableCell align="centre">TCV</TableCell>
                        <TableCell align="centre">Revenue</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data && props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => (
                            <TableRow key={row["S_no"]}>
                                <TableCell>{row["S_no"]}</TableCell>
                                <TableCell>{row["line_of_business"]}</TableCell>
                                <TableCell>{row["revenue_type"]}</TableCell>
                                <TableCell>{row["product"]}</TableCell>
                                <TableCell>{row["month"] + '-' + row["year"]}</TableCell>
                                <TableCell>{row["acv"]}</TableCell>
                                <TableCell>{row["tcv"]}</TableCell>
                                <TableCell>{row["revenue"]}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}