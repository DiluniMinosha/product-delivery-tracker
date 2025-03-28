from enum import Enum
from datetime import datetime
import uuid

class CarrierType(str, Enum):
    FEDEX = "FedEx"
    DHL = "DHL"

class ShipmentStatus(str, Enum):
    PENDING = "Pending"
    IN_TRANSIT = "In Transit"
    DELIVERED = "Delivered"
    FAILED = "Failed"

class Shipment:
    def __init__(
        self, 
        tracking_number: str = None,
        carrier: CarrierType = None, 
        sender_name: str = None,
        recipient_name: str = None,
        status: ShipmentStatus = ShipmentStatus.PENDING,
        created_at: datetime = None
    ):
        self.id = str(uuid.uuid4())
        self.tracking_number = tracking_number or str(uuid.uuid4())[:8].upper()
        self.carrier = carrier
        self.sender_name = sender_name
        self.recipient_name = recipient_name
        self.status = status
        self.created_at = created_at or datetime.now()