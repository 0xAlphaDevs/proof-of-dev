import Navbar from "@/app/components/Navbar"

export default function Creator({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="">
      <Navbar />
      <div className="px-12 py-4"> {children}</div>
    </section>
  )
}