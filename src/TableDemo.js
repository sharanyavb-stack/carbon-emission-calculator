import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import {
	Box, Button, Snackbar, Table, TableBody,
	 TableCell, TableHead, TableRow, TableContainer, Paper, Autocomplete, TextField, Input, ToggleButtonGroup, ToggleButton
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Creating styles
const useStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
	table: {
		minWidth: 650,
	},
	snackbar: {
		bottom: "104px",
	},
});
const materialList = [ 
    {label: "Steel bar", value: "2.397"},
    {label: "Sand", value: "0.007"},
    {label: "Gravel", value: "0.002"},
    {label: "Cement", value: "0.832"},
    {label: "Brick", value: "0.03215"},
    {label: "Glass", value: "1.4"},
    {label: "Aluminum", value: "9.46"},
    {label: "Wood Dark", value: "0.362"},
    {label: "Wood Light", value: "0.362"},
    {label: "Wood Sheathing - Plywood", value: "0.362"},
    {label: "Lime Powder", value: "0.230"},
    {label: "Slag", value: "0.443"},
    {label: "Fly ash", value: "0.027"},
    {label: "Oil Painting", value: "3.600"},
    {label: "Concrete", value: "0.120"},
]
function TableDemo() {
	// Creating style object
	const classes = useStyles();

	// Defining a state named rows
	// which we can update by calling on setRows function
	const [rows, setRows] = useState(JSON.parse(localStorage.getItem('rows')) || []);

	// Initial states
	const [open, setOpen] = React.useState(false);
	const [isEdit, setEdit] = React.useState(false);
	const [amount, setAmount] = React.useState('volume');
	const [disable, setDisable] = React.useState(true);
	const [showConfirm, setShowConfirm] = React.useState('');

	// Function For closing the alert snackbar
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	// Function For adding new row object
	const handleAdd = () => {
		setRows([
			...rows,
			{
				id: rows.length + 1, material: "",
				cef: "", quantity: "", ce:"", amount: "volume"
			},
		]);
		setEdit(true);
	};

	// Function to handle edit
	const handleEdit = (i) => {
		// If edit mode is true setEdit will
		// set it to false and vice versa
		setEdit(!isEdit);
	};

	// Function to handle save
	const handleSave = () => {
		setEdit(!isEdit);
        setRows(rows);
        localStorage.setItem('rows', JSON.stringify(rows))
		console.log("saved : ", rows);
		setDisable(true);
		setOpen(true);
	};

	// The handleInputChange handler can be set up to handle
	// many different inputs in the form, listen for changes
	// to input elements and record their values in state
	const handleInputChange = (e, index, isSelect) => {
        const list = [...rows];
        if (isSelect) {
            setDisable(false);
            const { label, value } = e;
            list[index]['material'] = label;
            list[index]['cef'] = value;
            setRows(list);
        } else {
            setDisable(false);
            const { name, value } = e.target;
            list[index][name] = value;
            setRows(list);
        }
        if(list.length && list[index].cef && list[index].quantity) {
            list[index]['ce'] = parseFloat(list[index].cef * list[index].quantity).toFixed(4);
            setRows(list)
        }
		
	};
    const handleQuantityChange = (event, value, i) => {
        const list = [...rows];
        list[i]['amount'] = value;
        setRows(list);
    }
	// Showing delete confirmation to users
	const handleConfirm = (i) => {
		setShowConfirm(i);
	};

	// Handle the case of delete confirmation where
	// user click yes delete a specific row of id:i
	const handleRemoveClick = (i) => {
        if(showConfirm !== '') {
            const list = [...rows];
            const updatedList = list.filter((value, index) => index != showConfirm)
            setRows(updatedList);
            localStorage.setItem('rows', JSON.stringify(updatedList))
            setShowConfirm('');
        }
	};

	// Handle the case of delete confirmation
	// where user click no
	const handleNo = () => {
		setShowConfirm('');
	};

return (
    <>
    <div style={{ padding: '10px', display: "flex", justifyContent: "space-between" }}>
		<div>
			{isEdit ? (
			<div>
				<Button onClick={handleAdd}  variant="contained" size="large">
				<AddBoxIcon onClick={handleAdd} />
				    ADD
				</Button>
				{rows.length !== 0 && (
					<Button  style={{marginLeft: '5px'}} disabled={disable} align="right" onClick={handleSave}  variant="contained" size="large">
						<DoneIcon />
						SAVE
					</Button>
				
				)}
			</div>
			) : (
			<div>
				<Button onClick={handleAdd} variant="contained" size="large">
				<AddBoxIcon onClick={handleAdd} />
				    ADD
				</Button>
				<Button align="right" style={{marginLeft: '5px'}} onClick={handleEdit} variant="contained" size="large">
				<CreateIcon />
				    EDIT
				</Button>
			</div>
			)}
		</div>
		</div>
    <TableContainer component={Paper} style={{margin: '10px', width: 'unset'}}>
	<Snackbar
		open={open}
		autoHideDuration={2000}
		onClose={handleClose}
		className={classes.snackbar}
	>
		<Alert onClose={handleClose} severity="success">
		Record saved successfully!
		</Alert>
	</Snackbar>
	<Box margin={1}>
		<TableRow align="center"></TableRow>

		<Table
		className={classes.table}
		aria-label="a dense table"
		>
            <TableHead>
                <TableRow>
                    <TableCell>Material</TableCell>
                    <TableCell>Carbon Emission factor (tCO<sub>2</sub>/unit)</TableCell>
                    <TableCell>Volume (m<sup>3</sup>) / Quantity (ton)</TableCell>
                    <TableCell>Carbon Emission (Tons)</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
			{rows.map((row, i) => {
			return (
				
				<TableRow  key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
					{isEdit ? (
					<>
						<TableCell>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={materialList}
                                size="small"
                                value={row?.material || ''}
                                name="material"
                                isOptionEqualToValue={(option, value) => option.label === value.label }
                                onChange={(e, value) => handleInputChange(value, i, true)}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} label="Material" placeholder="Select" />}
                                />
						</TableCell>
						<TableCell>
						{row.cef}
						</TableCell>
						<TableCell>
                            <Input
                                type="number"
                                size="small"
                                name="quantity"
                                value={row.quantity}
                                onChange={(e) => handleInputChange(e, i, false)}
                            />
                             <ToggleButtonGroup
                                color="primary"
                                style={{marginLeft: '5px'}}
                                value={row.amount || 'ton'}
                                size="small"
                                exclusive
                                onChange={(e, val) => handleQuantityChange(e, val, i)}
                                >
                                <ToggleButton value="volume">Volume</ToggleButton>
                                <ToggleButton value="quantity">Quantity</ToggleButton>
                                </ToggleButtonGroup>
						</TableCell>
                        <TableCell>
						    {row.ce}
						</TableCell>
					</>
					) : (
					<>
						<TableCell component="th" scope="row">
						{row.material}
						</TableCell>
						<TableCell component="th" scope="row">
						{row.cef}
						</TableCell>
						<TableCell component="th" scope="row">
						{row.quantity}
						</TableCell>
                        <TableCell component="th" scope="row">
						{row.ce}
						</TableCell>
					</>
					)}
					{isEdit ? (
                        <TableCell>
                            <Button className="mr10" onClick={() =>handleConfirm(i)}>
                                <ClearIcon />
                            </Button>
                        </TableCell>
					) : (
                        <TableCell>
                            <Button className="mr10" onClick={() =>handleConfirm(i)}>
                                <DeleteOutlineIcon />
                            </Button>
                        </TableCell>
					)}
					{(showConfirm === '') ? false : true && (
					<div>
						<Dialog
						open={(showConfirm === '') ? false : true}
						onClose={handleNo}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						>
						<DialogTitle id="alert-dialog-title">
							{"Confirm Delete"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
							Are you sure to delete
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button
							onClick={() => handleRemoveClick(i)}
							color="primary"
							autoFocus
							>
							Yes
							</Button>
							<Button
							onClick={handleNo}
							color="primary"
							autoFocus
							>
							No
							</Button>
						</DialogActions>
						</Dialog>
					</div>
					)}
				</TableRow>
				
			);
			})}
		</TableBody>
		</Table>
	</Box>
	</TableContainer>
    </>
);
}

export default TableDemo;
