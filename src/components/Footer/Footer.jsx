
export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white py-6">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Flight Search UI. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
