import React, { useContext } from 'react';
import AppContext from '@context/AppContext'
import styles from '@styles/OrderItem.module.scss';
import close from '@icons/icon_close.png'
import Image from 'next/image';

const OrderItem = ({ product, removeItem }) => {

	const { removeFromCart } = useContext(AppContext);

	const onRemoveItem = () => {
		removeFromCart(product);
	};

	
	return (
		<div className={styles.OrderItem}>
			<figure>
					<Image src={product.images[0]} alt={product.title} width={10} height={10}/>
			</figure>
			<p>{product.title}</p>
			<p>{product.price}</p>
			<Image src={close} alt="close" width={10} height={10} onClick={() => onRemoveItem()}/>
		</div>
	);
}

export default OrderItem;
