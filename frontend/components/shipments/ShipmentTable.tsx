import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '@/lib/utils'
import { StatusBadge } from '../ui/StatusBadge'
import { TruckIcon } from 'lucide-react'

interface Shipment {
  id: string
  tracking_number: string
  carrier: string
  sender_name: string
  recipient_name: string
  status: string
  created_at: string
}

export function ShipmentTable() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState({
    carrier: '',
    status: ''
  })

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/shipments`)
        setShipments(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch shipments', error)
        setIsLoading(false)
      }
    }

    fetchShipments()
  }, [])

  const filteredShipments = shipments.filter(shipment => 
    (!filter.carrier || shipment.carrier === filter.carrier) &&
    (!filter.status || shipment.status === filter.status)
  )

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Shipments</h2>
        <TruckIcon className="text-gray-500" />
      </div>

      <div className="flex space-x-4 mb-4">
        <select 
          value={filter.carrier}
          onChange={(e) => setFilter({...filter, carrier: e.target.value})}
          className="border rounded px-2 py-1"
        >
          <option value="">All Carriers</option>
          <option value="FedEx">FedEx</option>
          <option value="DHL">DHL</option>
        </select>

        <select 
          value={filter.status}
          onChange={(e) => setFilter({...filter, status: e.target.value})}
          className="border rounded px-2 py-1"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Tracking Number</th>
            <th className="py-2">Carrier</th>
            <th className="py-2">Sender</th>
            <th className="py-2">Recipient</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredShipments.map((shipment) => (
            <tr key={shipment.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{shipment.tracking_number}</td>
              <td className="py-2">{shipment.carrier}</td>
              <td className="py-2">{shipment.sender_name}</td>
              <td className="py-2">{shipment.recipient_name}</td>
              <td className="py-2">
                <StatusBadge status={shipment.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}