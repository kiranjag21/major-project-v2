import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
export default function BillTable(props){
    return(
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell style={{fontFamily:"Poppins, sans-serif"}}>Item Total</TableCell>
                        <TableCell style={{fontFamily:"Poppins, sans-serif"}} align="right">&#8377;{props.total}</TableCell>
                    </TableRow>
                    
                </TableBody>
            </Table>
        </TableContainer>
    )
}