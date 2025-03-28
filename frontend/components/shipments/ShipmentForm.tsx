import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { ShipmentSchema } from '@/lib/validation'
import { API_BASE_URL } from '@/lib/utils'
import { z } from 'zod'

export function ShipmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(ShipmentSchema)
  })

  const onSubmit = async (data: z.infer<typeof ShipmentSchema>) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      await axios.post(`${API_BASE_URL}/shipments`, data)
      setSubmitSuccess(true)
      reset()
    } catch (error) {
      setSubmitError('Failed to create shipment. Please try again.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Shipment</h2>
      
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          Shipment created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="carrier" className="block text-sm font-medium text-gray-700">
            Carrier
          </label>
          <select 
            {...register('carrier')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Carrier</option>
            <option value="FedEx">FedEx</option>
            <option value="DHL">DHL</option>
          </select>
          {errors.carrier && (
            <p className="mt-1 text-sm text-red-600">{errors.carrier.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="sender_name" className="block text-sm font-medium text-gray-700">
            Sender Name
          </label>
          <input
            type="text"
            {...register('sender_name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.sender_name && (
            <p className="mt-1 text-sm text-red-600">{errors.sender_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="recipient_name" className="block text-sm font-medium text-gray-700">
            Recipient Name
          </label>
          <input
            type="text"
            {...register('recipient_name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.recipient_name && (
            <p className="mt-1 text-sm text-red-600">{errors.recipient_name.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Shipment'}
          </button>
        </div>
      </form>
    </div>
  )
}