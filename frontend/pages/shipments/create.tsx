import { Navbar } from '@/components/layout/Navbar'
import { ShipmentForm } from '@/components/shipments/ShipmentForm'

export default function CreateShipment() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Shipment</h1>
        <ShipmentForm />
      </main>
    </div>
  )
}