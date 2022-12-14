import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

const initialForm = {
    amount: 0,
    description: "",
    // date: "",
    date: new Date(),
};

export default function TransactionForm({ fetchTransations, editTransaction }) {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        // console.log(editTransactions);
        if (editTransaction.amount !== undefined) {
            setForm(editTransaction);
        }
    }, [editTransaction]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleDate(newValue) {
        setForm({ ...form, date: newValue });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        editTransaction.amount === undefined ? create() : update();

        // const data = await res.json();
        // console.log(data);
    }
    function reload(res) {
        if (res.ok) {
            setForm(initialForm);
            fetchTransations();
        }
    }
    async function create() {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/transaction`,
            {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        // return res;
        reload(res);
    }
    async function update() {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
            {
                method: "PATCH",
                body: JSON.stringify(form),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        reload(res);
    }
    return (
        <Card sx={{ minWidth: 275, marginTop: 10 }}>
            <CardContent>
                <Typography variant="h6">Add New Transaction</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        sx={{ marginRight: 5 }}
                        size="small"
                        name="amount"
                        id="outlined-basic"
                        label="Amount"
                        variant="outlined"
                        value={form.amount}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ marginRight: 5 }}
                        size="small"
                        name="description"
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Transaction Date"
                            inputFormat="MM/DD/YYYY"
                            value={form.date}
                            onChange={handleDate}
                            renderInput={(params) => (
                                <TextField
                                    sx={{ marginRight: 5 }}
                                    size="small"
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    {editTransaction.amount !== undefined && (
                        <Button type="submit" variant="success">
                            Update
                        </Button>
                    )}
                    {editTransaction.amount === undefined && (
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
