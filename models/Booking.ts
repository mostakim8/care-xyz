import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  serviceId: { type: String, required: true }, 
  patientName: { type: String, required: false }, 
  division: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  address: { type: String, required: true },
  duration: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
