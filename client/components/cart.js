import React from 'react'
import {connect} from 'react-redux'
import {getCartFromDb} from '../store/cart'

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            cartLineItems: [],
            userId: 0
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.id
        const cart = this.props.getCart(userId)
        console.log('cart', cart)
        const cartLineItems = cart.lineItem
        this.setState(cartLineItems, userId)
    }

    // handleDelete() {

    // }

    // handleQuantityChange() {

    // }

    render() {
        const cartLineItems = this.state.cartLineItems
        const userId = this.state.userId
        return (
            <div id='shopping-cart'>
                <h3>Your Cart</h3>
                <ul id='cart-items'>
                    {
                        cartLineItems.map((lineItem) => {
                            return (
                                <li key={lineItem.id}>{lineItem.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

// const mapState = state => {

// }

const mapDispatch = (dispatch) => ({
    getCart: (id) => {
        dispatch(getCartFromDb(id))
    }
})


export default connect(null, mapDispatch)(Cart)