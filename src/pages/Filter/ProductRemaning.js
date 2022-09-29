import { createSelector } from "@reduxjs/toolkit";

const products = (state) => state.products.items
const filterPrice = (state) => state.filter

export const productRemening = createSelector(
    products,
    filterPrice,
    (product, price) => {
        return product.filter(ele => {
            return ele.newPrice <= price.price && ele.newPrice >= price.price - 100
        })
    }
)

