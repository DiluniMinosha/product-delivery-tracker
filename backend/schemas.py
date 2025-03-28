from pydantic import BaseModel, Field
from datetime import datetime
from models import CarrierType, ShipmentStatus

class ShipmentCreate(BaseModel):
    carrier: CarrierType
    sender_name: str = Field(..., min_length=2, max_length=100)
    recipient_name: str = Field(..., min_length=2, max_length=100)

class ShipmentResponse(BaseModel):
    id: str
    tracking_number: str
    carrier: CarrierType
    sender_name: str
    recipient_name: str
    status: ShipmentStatus
    created_at: datetime

class CarrierMetrics(BaseModel):
    total_shipments: int
    delivered_shipments: int
    success_rate: float
    carrier_breakdown: dict 