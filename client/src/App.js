import { useState, useEffect } from "react";
import AppBar from "./components/AppBar.js";
import TransactionForm from "./components/TransactionForm.js";
import TransactionsList from "./components/TransactionsList.js";
import Container from "@mui/material/Container";

function App() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransations();
    }, []);

    async function fetchTransations() {
        const res = await fetch("http://localhost:4000/transaction");
        const { data } = await res.json();
        setTransactions(data);
    }

    return (
        <div>
            <AppBar />
            <Container>
                <TransactionForm fetchTransations={fetchTransations} />

                <TransactionsList
                    transactions={transactions}
                    fetchTransations={fetchTransations}
                />
            </Container>
        </div>
    );
}

export default App;
