import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { ProductsList } from "../products/Products"
import { ProductsForm } from "../products/ProductForm"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div>Buy Some Candy</div>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<LocationsList />} />
				<Route path="products" element={<ProductsList />} />


				<Route path="products/create" element={<ProductsForm />} />

			</Route>
		</Routes>
	)
}

