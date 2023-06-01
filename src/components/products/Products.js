import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"

export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPriced, setTopPriced] = useState(false)
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    useEffect(
        () => {
            if (topPriced) {
                const topPricedProducts = products.filter(product => product.pricePerUnit >= 2)
                setFilteredProducts(topPricedProducts)
            }
            else {
                setFilteredProducts(products)
            }
        },
        [topPriced]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8089/products?_expand=productType`)
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })


            console.log("Initial state of products", products) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )



    useEffect(
        () => {
            if (kandyUserObject.staff) {
                const sortedProducts = products.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                setFilteredProducts(sortedProducts);
                // For employees
                setFilteredProducts(products)
            }
        },
        [products]
    )



    return <>
        {
            kandyUserObject.staff

                ? <>

                    <button onClick={() => { setTopPriced(true) }}>Top Priced</button>
                    <button onClick={() => { setTopPriced(false) }}>Show All</button>


                    <button onClick={() => navigate("/product/create")}>Create Product Form</button>

                </>
                : <>


                </>
        }



        <h2>List of Products</h2>

        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product" key={`product-- ${product.id}`}>
                            <header>{product.name}</header>

                            <footer>Price: ${product.pricePerUnit}</footer>
                            <footer><b>Type: {product.productType.type}</b></footer>
                        </section>
                    }
                )

            }


        </article>
    </>
}