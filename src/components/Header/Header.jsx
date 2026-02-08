
import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Plane className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        FlightSearch
                    </span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Home
                    </Link>
                    <Link href="/flights" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Flights
                    </Link>
                </nav>
            </div>
        </header>
    );
}
