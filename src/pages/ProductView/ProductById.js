import { createSelector } from "@reduxjs/toolkit";

const products = (state) => state.products.items
const filters = (state) => state.filter.id

export const ProductById = createSelector(
    products,
    filters,
    (product, filter) => {
        return product.filter(ele => {
            return +ele.id === +filter
        })
    }
)

