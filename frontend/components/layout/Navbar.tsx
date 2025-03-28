import Link from 'next/link'
import { Package2Icon, HomeIcon, TruckIcon, PlusIcon } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="border-b bg-gray-100/40 dark:bg-gray-800/40">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-semibold"
        >
          <Package2Icon className="h-6 w-6" />
          <span>Delivery Tracker</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium flex items-center gap-2 hover:text-primary"
          >
            <HomeIcon className="h-4 w-4" />
            Dashboard
          </Link>
          <Link 
            href="/shipments" 
            className="text-sm font-medium flex items-center gap-2 hover:text-primary"
          >
            <TruckIcon className="h-4 w-4" />
            Shipments
          </Link>
          <Link 
            href="/shipments/create" 
            className="text-sm font-medium flex items-center gap-2 hover:text-primary"
          >
            <PlusIcon className="h-4 w-4" />
            Create Shipment
          </Link>
        </nav>
      </div>
    </nav>
  )
}