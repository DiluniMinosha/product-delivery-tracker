import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface CarrierPerformanceData {
  carrier: string
  success_rate: number
}

export function CarrierPerformanceChart() {
  const [performanceData, setPerformanceData] = useState<CarrierPerformanceData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/metrics`)
        const data = Object.entries(response.data.carrier_breakdown).map(([carrier, metrics]) => ({
          carrier,
          success_rate: metrics.success_rate * 100
        }))
        setPerformanceData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch metrics', error)
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Carrier Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={performanceData}>
          <XAxis dataKey="carrier" />
          <YAxis 
            label={{ 
              value: 'Success Rate (%)', 
              angle: -90, 
              position: 'insideLeft' 
            }} 
          />
          <Tooltip />
          <Bar dataKey="success_rate" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}