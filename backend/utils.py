import random
from models import Shipment, ShipmentStatus, CarrierType

class ShipmentManager:
    def __init__(self):
        self.shipments = []

    def create_shipment(self, shipment_data):
        new_shipment = Shipment(
            carrier=shipment_data.carrier,
            sender_name=shipment_data.sender_name,
            recipient_name=shipment_data.recipient_name
        )
        self.shipments.append(new_shipment)
        return new_shipment

    def get_shipments(self, limit=10):
        return sorted(self.shipments, key=lambda x: x.created_at, reverse=True)[:limit]

    def get_shipment_by_id(self, shipment_id):
        return next((shipment for shipment in self.shipments if shipment.id == shipment_id), None)

    def update_shipment_status(self, shipment_id, new_status):
        shipment = self.get_shipment_by_id(shipment_id)
        if shipment:
            shipment.status = new_status
        return shipment

    def simulate_carrier_status_update(self):
        for shipment in self.shipments:
            if shipment.status not in [ShipmentStatus.DELIVERED, ShipmentStatus.FAILED]:
                success_prob = {
                    CarrierType.FEDEX: 0.9,
                    CarrierType.DHL: 0.8
                }.get(shipment.carrier, 0.85)

                random_val = random.random()
                if random_val < success_prob:
                    shipment.status = ShipmentStatus.DELIVERED
                elif random_val > 0.95:
                    shipment.status = ShipmentStatus.FAILED

    def get_carrier_metrics(self):
        total_shipments = len(self.shipments)
        delivered_shipments = sum(1 for s in self.shipments if s.status == ShipmentStatus.DELIVERED)
        
        carrier_breakdown = {}
        for carrier in CarrierType:
            carrier_shipments = [s for s in self.shipments if s.carrier == carrier]
            total_carrier_shipments = len(carrier_shipments)
            delivered_carrier_shipments = sum(1 for s in carrier_shipments if s.status == ShipmentStatus.DELIVERED)
            
            carrier_breakdown[carrier.value] = {
                'total': total_carrier_shipments,
                'delivered': delivered_carrier_shipments,
                'success_rate': delivered_carrier_shipments / total_carrier_shipments if total_carrier_shipments > 0 else 0
            }

        return {
            'total_shipments': total_shipments,
            'delivered_shipments': delivered_shipments,
            'success_rate': delivered_shipments / total_shipments if total_shipments > 0 else 0,
            'carrier_breakdown': carrier_breakdown
        }

shipment_manager = ShipmentManager()