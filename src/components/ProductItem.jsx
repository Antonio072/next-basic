import React, { useContext } from 'react';
import AppContext from '@context/AppContext';
import Image from 'next/image';

import styles from '@styles/ProductItem.module.scss';

import addToCartIcon from '@icons/bt_add_to_cart.svg';

const ProductItem = ({product}) => {
	const { addToCart } = useContext(AppContext);

	const handleClick = item => {
		addToCart(item);
	}
	return (
		<div className={styles.ProductItem}>
			<Image  loader={() => product.images[0]} width={100} height={100} src={product.images[0]} alt={product.title} />
			<div className={styles["product-info"]}>
				<div>
					<p>${product.price}</p>
					<p>{product.title}</p>
				</div>
				<figure onClick={() => handleClick(product)}>
					<Image width={100} height={100} src={addToCartIcon} alt="" />
				</figure>
			</div>
		</div>
	);
}

export default ProductItem;
