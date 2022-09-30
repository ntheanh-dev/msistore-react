import { createSelector } from "@reduxjs/toolkit";

const products = (state) => state.products.items
const filters = (state) => state.filter

export const ProductBySearch = createSelector(
    products,
    filters,
    (product, filter) => {
        let searchValue = filter.search.toLowerCase()
        let name
        return product.filter(ele => {
            name = ele.title.toLowerCase()
            return name.includes(searchValue)
        })
    }
)

