import { ROUTES } from "@/lib/routes";
import { IMAGES } from "@/assets/images";
import Link from "next/link";


export default function Logo() {
  return (
    <Link href={ROUTES.HOME}><img src={IMAGES.home.hero.logo} alt='' /></Link>
  )
}
