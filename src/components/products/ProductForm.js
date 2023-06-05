import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductsForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [product, update] = useState({
        name: "",
        type: 0,
        price: 0


    })

    const [productTypes, setProductTypes] = useState([])

    const navigate = useNavigate()
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const productsToSendToAPI = {

            name: product.name,
            productTypeId: parseInt(product.productTypeId),
            pricePerUnit: +product.price


        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productsToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")

            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then(response => response.json())
                .then((productsArray) => {
                    setProductTypes(productsArray)
                })
        },
        [] //When this array is empty, you are observing inital componenet state
    );



    // TODO: Perform the fetch() to POST the object to the API



    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Product name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name the product"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="radio-buttons">
                    <label>Type of product</label>
                    {
                        productTypes.map((productType) => (

                            <>
                                <input
                                    required autoFocus
                                    type='radio'
                                    className="radio-buttons"
                                    name='productTypeId'
                                    value={productType.id}
                                    onChange={
                                        (evt) => {

                                            const copy = { ...product }
                                            copy[evt.target.name] = evt.target.value
                                            update(copy)
                                        }
                                    }

                                /> {productType.type} </>)

                        )
                    }







                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Price of product</label>
                    <input type="number"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Product
            </button>
        </form>
    )
}