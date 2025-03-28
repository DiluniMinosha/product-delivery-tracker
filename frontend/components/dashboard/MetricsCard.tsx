import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '@/lib/utils'
import { TrendingUpIcon, PackageIcon } from 'lucide-react'

interface Metrics {
  total_shipments: number
  delivered_shipments: number
  success_rate: number
  carrier_breakdown: {
    [key: string]: {
      total: number
      delivered: number
      success_rate: number
    }
  }
}

export function MetricsCard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/metrics`)
        setMetrics(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch metrics', error)
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (!metrics) {
    return null
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Shipment Metrics</h2>
        <PackageIcon className="text-gray-500" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Shipments</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">
              {metrics.total_shipments}
            </span>
            <TrendingUpIcon className="text-green-500" />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Delivery Success Rate</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">
              {(metrics.success_rate * 100).toFixed(1)}%
            </span>
            <TrendingUpIcon className="text-green-500" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Carrier Performance</h3>
        <div className="space-y-2">
          {Object.entries(metrics.carrier_breakdown).map(([carrier, data]) => (
            <div key={carrier} className="flex justify-between">
              <span>{carrier}</span>
              <span className="text-sm text-gray-500">
                {(data.success_rate * 100).toFixed(1)}% ({data.delivered}/{data.total})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}