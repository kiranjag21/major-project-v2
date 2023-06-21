import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
export default function OrderTable(props){
    return(
        <TableContainer maxwidth="sm" component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell  style={{fontFamily:"Poppins, sans-serif"}}>Dish</TableCell>
                                <TableCell  style={{fontFamily:"Poppins, sans-serif"}} align="right">Quantity</TableCell>
                                <TableCell style={{fontFamily:"Poppins, sans-serif"}} align="right">Price</TableCell>
                                <TableCell style={{fontFamily:"Poppins, sans-serif"}} align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.dishes.map((dish)=>(
                                    <TableRow key={dish.dishId}>
                                        <TableCell style={{fontFamily:"Poppins, sans-serif"}} component="th" scope="row">
                                            {dish.dishName}
                                        </TableCell>
                                        <TableCell style={{fontFamily:"cursive"}} align="right">{dish.quantity}</TableCell>
                                        <TableCell style={{fontFamily:"cursive"}} align="right">&#8377;{dish.price}</TableCell>
                                        <TableCell style={{fontFamily:"cursive"}} align="right">&#8377;{dish.quantity * dish.price}</TableCell>
                                    </TableRow>
                                ))
                            }
                             
                        </TableBody>
                    </Table>
                </TableContainer>
    )
}