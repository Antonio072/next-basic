import React, { useState, useContext } from 'react';
import Image from 'next/image';
import AppContext from '@context/AppContext';
import styles from "@styles/Header.module.scss"

import MyOrder from '@containers/MyOrder';
import Menu from '@components/Menu';

import menu from '@icons/icon_menu.svg';
import logo_yard_sale from '@logos/logo_yard_sale.svg';
import icon_shopping_cart from '@icons/icon_shopping_cart.svg';
import Link from 'next/link';

const Header = () => {
	const [toggle, setToggle] = useState(false);
	const [toggleOrders, setToggleOrders] = useState(false);
	const { state: { cart } } = useContext(AppContext);

	const handleToggle = () => {
		setToggle(!toggle);
	}

	const handleMyOrderToggle = () => {
		setToggleOrders(!toggleOrders);
	}

	return (
		<nav className={styles.Nav}>
			<Image width={20} height={20} src={menu} alt="menu" className={styles.menu}/>
			<div className={styles['navbar-left']}>
				<Link href="/">
					<Image width={100} height={50} src={logo_yard_sale.src} alt="logo" className={styles['nav-logo']} />
				</Link>
				<ul>
					<li>
						<a href="/">All</a>
					</li>
					<li>
						<a href="/">Clothes</a>
					</li>
					<li>
						<a href="/">Electronics</a>
					</li>
					<li>
						<a href="/">Furnitures</a>
					</li>
					<li>
						<a href="/">Toys</a>
					</li>
					<li>
						<a href="/">Others</a>
					</li>
				</ul>
			</div>
			<div className={styles['navbar-right']}>
				<ul>
					<li className={styles['navbar-email']} >
						platzi@example.com
					</li>

					<li className={styles['navbar-shopping-cart']}>
						<Image width={35} height={35} src={icon_shopping_cart.src} alt="shopping cart" onClick={() => handleMyOrderToggle()}/>
						{cart.length > 0 && <div>{cart.length}</div>}
						{toggleOrders && <MyOrder />}
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Header;
