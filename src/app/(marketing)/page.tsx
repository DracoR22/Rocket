import { Button } from "@/components/ui/button"
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "../../components/landing/hero"
import { Languages } from "../../components/landing/languages"
import { Metrics } from "../../components/landing/metrics"
import { Fluency } from "../../components/landing/fluency"
import { Reasons } from "../../components/landing/reasons"

const HomePage = () => {
  return (
    <>
     <Hero/>
     <Languages/>
     <Metrics>
     <Fluency/>
     </Metrics>
     <Reasons/>
    </>
  )
}

export default HomePage
