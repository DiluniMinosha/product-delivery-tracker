from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum
from datetime import datetime
import uuid

app = FastAPI(title="Product Delivery Status Tracker")

# Carrier Enum
class CarrierType(str):
    FEDEX = "FedEx"
    DHL = "DHL"

# Shipment Status Enum
class ShipmentStatus(str):
    PENDING = "Pending"
    IN_TRANSIT = "In Transit"
    DELIVERED = "Delivered"
    DELAYED = "Delayed"
    FAILED = "Failed"

# Shipment Model
class Shipment(BaseModel):
    id: str = str(uuid.uuid4())
    tracking_number: str
    carrier: CarrierType
    status: ShipmentStatus = ShipmentStatus.PENDING
    created_at: datetime = datetime.utcnow()
    sender_name: str
    recipient_name: str
    weight: float
    destination: str

# In-memory storage
shipments_db: List[Shipment] = []

# Basic API Endpoints
@app.post("/shipments")
def create_shipment(shipment: Shipment):
    shipments_db.append(shipment)
    return shipment

@app.get("/shipments")
def list_shipments():
    return shipments_db[:10]  # Limit to 10 recent shipments