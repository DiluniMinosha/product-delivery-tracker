from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import CarrierType, ShipmentStatus
from schemas import ShipmentCreate, ShipmentResponse
from utils import shipment_manager

app = FastAPI(title="Product Delivery Tracker")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/shipments", response_model=ShipmentResponse)
async def create_shipment(shipment: ShipmentCreate):
    new_shipment = shipment_manager.create_shipment(shipment)
    shipment_manager.simulate_carrier_status_update()
    return ShipmentResponse(
        id=new_shipment.id,
        tracking_number=new_shipment.tracking_number,
        carrier=new_shipment.carrier,
        sender_name=new_shipment.sender_name,
        recipient_name=new_shipment.recipient_name,
        status=new_shipment.status,
        created_at=new_shipment.created_at
    )

@app.get("/shipments", response_model=list[ShipmentResponse])
async def list_shipments(limit: int = 10):
    shipments = shipment_manager.get_shipments(limit)
    return [
        ShipmentResponse(
            id=shipment.id,
            tracking_number=shipment.tracking_number,
            carrier=shipment.carrier,
            sender_name=shipment.sender_name,
            recipient_name=shipment.recipient_name,
            status=shipment.status,
            created_at=shipment.created_at
        ) for shipment in shipments
    ]

@app.get("/shipments/{shipment_id}", response_model=ShipmentResponse)
async def get_shipment(shipment_id: str):
    shipment = shipment_manager.get_shipment_by_id(shipment_id)
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return ShipmentResponse(
        id=shipment.id,
        tracking_number=shipment.tracking_number,
        carrier=shipment.carrier,
        sender_name=shipment.sender_name,
        recipient_name=shipment.recipient_name,
        status=shipment.status,
        created_at=shipment.created_at
    )

@app.put("/shipments/{shipment_id}/status")
async def update_shipment_status(shipment_id: str, status: ShipmentStatus):
    updated_shipment = shipment_manager.update_shipment_status(shipment_id, status)
    if not updated_shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return {"status": "updated"}

@app.get("/carriers")
async def list_carriers():
    return [carrier.value for carrier in CarrierType]

@app.get("/metrics")
async def get_metrics():
    return shipment_manager.get_carrier_metrics()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)