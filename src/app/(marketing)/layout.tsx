import { Footer } from "../../components/landing/footer"
import { Header } from "../../components/landing/header"

type Props = {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <div className="container flex flex-grow flex-col px-0">
           <Header/>
          <main className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer/>
        </div>
    )
}

export default MarketingLayout