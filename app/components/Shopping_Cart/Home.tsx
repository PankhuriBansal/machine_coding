
import {CartState} from "./context/Context"
import SingleProduct from "./SingleProduct"
import Filters from "./Filters"
import "./styles.css"


const Home = () => {
    const {state} = CartState()
    // console.log(state)
    return (
        <div className="home">
            {/* side bar filter components */}
            <Filters/>
            <div className='productContainer'>
                {
                    state?.products?.map((prod) => {
                        return <SingleProduct prod={prod} key={prod.id}/>
                    })
                }

            </div>
        </div>
    )
}

export default Home