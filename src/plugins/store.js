import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            cart: [],
            step: 1
        }
    },
    mutations: {
        addProductToCart(state, payload = { product: null, qty: 0 }) {
            state.cart.push(payload)
        },
        nextStep(state) {
            state.step++
        },
        backStep(state) {
            state.step--
        }
    },
})

export default store