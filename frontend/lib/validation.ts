import { z } from "zod"

export const CarrierType = z.enum(["FedEx", "DHL"])
export const ShipmentStatus = z.enum(["Pending", "In Transit", "Delivered", "Failed"])

export const ShipmentSchema = z.object({
  carrier: CarrierType,
  sender_name: z.string().min(2, "Sender name must be at least 2 characters"),
  recipient_name: z.string().min(2, "Recipient name must be at least 2 characters")
})