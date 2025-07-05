import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Progress. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
