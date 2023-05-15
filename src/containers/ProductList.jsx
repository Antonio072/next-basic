import React, {useState, useEffect} from 'react';

import ProductItem from '@components/ProductItem';
import useGetProducts from '@hooks/useGetProducst';

import styles from '@styles/ProductList.module.scss';

const API = 'https://api.escuelajs.co/api/v1/products';

const ProductList = () => {
	const [loading, setLoading] = useState(true);
	const products = useGetProducts(API);

	useEffect(() => {
		if(products.length !== 0 && setLoading !== undefined) {
			setLoading(false);
		}
	}), [products];

    return (
        <section className={styles.ProductList}>
			{loading ? 
				<div className="loading">
					Cargando
				</div>
				:
				<>
					{products.map(product => <ProductItem product={product} key={product.id}/>)}
				</>
			}     
        </section>
    )
}
export default ProductList;
