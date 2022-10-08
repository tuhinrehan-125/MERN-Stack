import { Router } from "express";
import Transaction from "../models/Transaction.js";

const router = Router();

router.get("/", async (req, response) => {
    const transaction = await Transaction.find({}).sort({ createdAt: -1 });

    response.json({ data: transaction });
});

router.post("/", async (req, res) => {
    // console.log(req.body);
    const { amount, description, date } = req.body;
    const transaction = new Transaction({
        amount,
        description,
        date,
    });
    await transaction.save();
    res.json({ message: "Success" });
});

router.delete("/:id", async (req, res) => {
    await Transaction.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "success" });
});

export default router;
