import { Router } from "express";
import passport from "passport";
import Transaction from "../models/Transaction.js";

const router = Router();

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, response) => {
        const transaction = await Transaction.find({}).sort({ createdAt: -1 });

        response.json({ data: transaction });
    }
);

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

router.patch("/:id", async (req, res) => {
    await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "success" });
});

export default router;
