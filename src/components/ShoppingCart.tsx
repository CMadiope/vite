import React from "react";
import { Offcanvas } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";

const ShoppingCart = () => {
    const { closeCart, isOpen } = useShoppingCart();
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
        </Offcanvas>
    );
};

export default ShoppingCart;
