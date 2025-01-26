import React, { useContext } from 'react'
import { CartContext } from '../Features/ContextProvider'
import CartProduct from '../Components/CartProduct'


const Cart = () => {
    const {cart}= useContext(CartContext)
  return (
    <div>
        <div>
        {cart.map(p => (
          <CartProduct product={p}>  <CartProduct/>

        ))}
        </div>
    </div>
  )
}

export default Cart
