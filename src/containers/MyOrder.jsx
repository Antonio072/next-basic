import React, { useContext } from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext'

import styles from '@styles/MyOrder.module.scss';

import flechita from '@icons/flechita.svg';

import Image from 'next/image';
import Link from 'next/link';

const MyOrder = () => {
	const { state } = useContext(AppContext);

	const sumTotal = () => {
		const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
		const sum = state.cart.reduce(reducer, 0);
		return sum;
	};

	return (
		<aside className={styles.MyOrder}>
			<div className={styles["title-container"]}>
				<Image src={flechita} alt="arrow" width={flechita.width} height={flechita.heigth}/>
				<p className={styles["title"]}>My order</p>
			</div>
			<div className={styles["my-order-content"]}>
				{state.cart.map((item) => (
					<OrderItem product={item} key={`orderItem-${item.id}`}/>
				))}
				<div className={styles["order"]}>
					<p>
						<span>Total</span>
					</p>
					<p>${sumTotal()}</p>
				</div>
			</div>
			<Link href={'/checkout'} className={styles["primary-button"]}>
				Checkout
			</Link>
		</aside>
	);
}

export default MyOrder;
