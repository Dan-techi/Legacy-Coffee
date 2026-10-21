import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-footer px-6 py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">Legacy Coffee</p>
        <p className="text-sm">Rooted in Uganda. Shared with the world.</p>
        <Link to="/contact" className="text-sm underline underline-offset-4 hover:no-underline">
          Get in touch
        </Link>
      </div>
    </footer>
  )
}
