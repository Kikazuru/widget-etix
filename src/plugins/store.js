import { createStore } from 'vuex'

const findProductInCart = (cart, productTypeID) => {
    return cart.find(cartItem => cartItem?.productType?.producttype_id == productTypeID)
}

const findIndexProductInCart = (cart, productTypeID) => {
    return cart.map(cartItem => cartItem.productType.producttype_id).indexOf(productTypeID)
}

// Create a new store instance.
const store = createStore({
    state() {
        return {
            guestToken: null,
            productID: null,
            cart: [],
            step: 1
        }
    },
    mutations: {
        addProductToCart(state, payload = { productType: null, qty: 0 }) {
            const findType = findProductInCart(state.cart, payload?.productType.producttype_id)
            if (findType) {
                findType.qty++
            } else {
                state.cart.push(payload)
            }
        },
        reduceProductFromCart(state, payload = { productType: null, qty: 0 }) {
            const findIndex = findIndexProductInCart(state.cart, payload.productType.producttype_id)

            if (state.cart[findIndex].qty > 1) {
                state.cart[findIndex].qty--
            } else {
                state.cart.splice(findIndex, 1)
            }
        },
        removeProductFromCart(state, payload = { productType: null }) {
            const findIndex = findIndexProductInCart(state.cart, payload.productType.producttype_id)

            if (findIndex != -1) {
                state.cart.splice(findIndex, 1)
            }
        },
        nextStep(state) {
            state.step++
        },
        backStep(state) {
            state.step--
        }
    },
    getters: {
        totalCartQty(state) {
            return state.cart.map(cartItem => cartItem.qty).reduce((partialSum, a) => partialSum + a, 0);
        },
        findProductInCart: (state) => (productTypeID) => {
            return findProductInCart(state.cart, productTypeID)
        }
    }
})

export default store