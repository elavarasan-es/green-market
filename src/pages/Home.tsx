import BestSeller from "../components/BestSeller"
import BottomBanner from "../components/BottomBanner"
import Categories from "../components/Categories"
import MainBanner from "../components/MainBanner"
import NewsLetter from "../components/NewsLetter"


function Home() {
  return (
    <div className="mt-10">
      <div>
        <MainBanner/>
        <Categories/>
        <BestSeller/>
        <BottomBanner/>
        <NewsLetter/>
       
      </div>
    </div>
  )
}

export default Home