import Contact from "../models/Contact.js";

// 📩 Create a complaint
export const createContact = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required" });
    }

    const contact = await Contact.create({
      user: req.user._id,
      subject,
      message,
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error("Create contact error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 📜 Get all complaints for the logged-in user
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update a complaint (only by owner and only if pending)
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) return res.status(404).json({ message: "Complaint not found" });

    // ❗ Only allow updating while pending
    if (contact.status !== "pending") {
      return res.status(400).json({ message: "Only pending complaints can be updated" });
    }

    const { subject, message, status, priority } = req.body;

    if (subject !== undefined) contact.subject = subject;
    if (message !== undefined) contact.message = message;
    if (status !== undefined) contact.status = status;
    if (priority !== undefined) contact.priority = priority;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({ message: error.message });
  }
};


// 🗑️ Delete a complaint (only by owner and only if pending)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) return res.status(404).json({ message: "Complaint not found" });

    if (contact.status !== "pending") {
      return res.status(400).json({ message: "Only pending complaints can be deleted" });
    }

    await contact.deleteOne();
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ message: error.message });
  }
};
