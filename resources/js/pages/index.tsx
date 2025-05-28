import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Head, router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"

export default function Page() {
  const handleOrder = () => {
    //Menambah data

    router.visit('/categories', {
      method: "get",
      data: {
        //query: "Koding Akademi"
        page: 1
      },
      onSuccess: () => {
        console.log("Selamat order Anda berhasil dibuat")
      },
      onError: () => {
        console.log("Terjadi kesalahan");
      }
    });
  }

  return (
    <>
    <Head title="Dashboard" />
    <DashboardLayout>
      <Button onClick={handleOrder}>Order Now</Button>
    </DashboardLayout>
    </>
  )
}
