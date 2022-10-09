import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import TransactionForm from "../components/TransactionForm.js";
import TransactionsList from "../components/TransactionsList.js";
import Container from "@mui/material/Container";

export default function Hogin() {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState({});

    useEffect(() => {
        fetchTransations();
    }, []);

    async function fetchTransations() {
        const token = Cookies.get("token");
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/transaction`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const { data } = await res.json();
        setTransactions(data);
    }
    return (
        <Container>
            <TransactionForm
                fetchTransations={fetchTransations}
                editTransaction={editTransaction}
            />

            <TransactionsList
                transactions={transactions}
                fetchTransations={fetchTransations}
                setEditTransaction={setEditTransaction}
            />
        </Container>
    );
}
