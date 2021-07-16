import { Link } from 'react-router-dom'
import React from "react";
import {useCart} from "../hooks/useCart";


function Header(props){
    const {totalPrice} = useCart()
    return (
        <header className='d-flex justify-between align-center p-40'>
            <Link to="/">
                <div className='d-flex align-center'>
                    <img width={40} height={40} alt='img' src="/img/logo.png"  />
                    <div>
                        <h3 className='text-uppercase'>React Sneakers</h3>
                        <p className='opacity-5'>Магазин лучших кросовок</p>
                    </div>
                </div>
            </Link>

            <ul className='d-flex'>
                <li onClick={props.onClickCart} className='mr-30 cu-p' >
                    <img width={18} height={18} src="/img/shop.svg" alt='Корзина' />
                    <span> {totalPrice} руб. </span>
                </li>
                <li className='mr-30'>
                    <Link to="/favorites">
                        <img width={18} height={18} src="/img/Heart.png" alt='Закладки' />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="/img/Me.png" alt='Профиль' />
                    </Link>
                </li>
            </ul>
        </header>
    )
}
export default Header