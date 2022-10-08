import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import { useState } from "react";

const initialForm = {
    amount: 0,
    description: "",
    // date: "",
    date: new Date(),
};

export default function TransactionForm({ fetchTransations }) {
    const [form, setForm] = useState(initialForm);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleDate(newValue) {
        setForm({ ...form, date: newValue });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/transaction", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
            },
        });
        // const data = await res.json();
        // console.log(data);
        if (res.ok) {
            setForm(initialForm);
            fetchTransations();
        }
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
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
