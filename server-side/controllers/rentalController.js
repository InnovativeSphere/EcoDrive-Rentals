import Rental from "../models/Rental.js";

// Create a rental
export const createRental = async (req, res) => {
  try {
    const { carId, startDate, endDate, totalCost } = req.body;

    if (!carId || !startDate || !endDate || !totalCost) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const rental = await Rental.create({
      user: req.user._id,
      carId,
      startDate,
      endDate,
      totalCost,
      status: "active", // default status
    });

    res.status(201).json(rental);
  } catch (error) {
    console.error("Rental creation error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update rental (only within 12 hours)
export const updateRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    const diffHours =
      (Date.now() - new Date(rental.createdAt).getTime()) / (1000 * 60 * 60);
    if (diffHours > 12) {
      return res
        .status(400)
        .json({ message: "Rental cannot be updated after 12 hours" });
    }

    if (rental.status !== "active") {
      return res
        .status(400)
        .json({ message: "Only active rentals can be updated" });
    }

    const { startDate, endDate, pricePerDay } = req.body;

    if (startDate) rental.startDate = startDate;
    if (endDate) rental.endDate = endDate;

    if (startDate && endDate && pricePerDay) {
      const rentalDays =
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24);
      rental.totalCost = rentalDays * pricePerDay;
    }

    await rental.save();
    res.json(rental);
  } catch (error) {
    console.error("Rental update error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Cancel rental (only within 12 hours)
export const cancelRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    const diffHours =
      (Date.now() - new Date(rental.createdAt).getTime()) / (1000 * 60 * 60);
    if (diffHours > 12) {
      return res
        .status(400)
        .json({ message: "Rental cannot be cancelled after 12 hours" });
    }

    rental.status = "cancelled";
    await rental.save();
    res.json({ message: "Rental cancelled", rental });
  } catch (error) {
    console.error("Rental cancellation error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get rentals for a user (raw data only)
export const getUserRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user._id }).lean();
    res.json(rentals);
  } catch (error) {
    console.error("Get rentals error:", error);
    res.status(500).json({ message: error.message });
  }
};
