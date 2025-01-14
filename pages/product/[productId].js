import React, {useContext} from 'react';
import Head from 'next/head';
import {ProductsContext} from '../../context/context.js';
import Layout, { siteTitle } from '../../components/Layout';
import MainCatalog from '../../components/MainCatalog';
import MobExtra from '../../components/MobExtra';
import ProductContent from '../../components/ProductContent';
import apiProducts from '../../helpers/apiProducts';

const api = new apiProducts();

const Product = ({product}) => {
  const context = useContext(ProductsContext);
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {product ?
        <>
          <ProductContent product={product}/>
          {/* { context.desktop ? <MainCatalog  /> : <MobExtra /> } */}
        </>
      : null}
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  if (!params?.productId) {
    return {
      notFound: true
    }
  }
  try {
    const [ product ] = await Promise.all([
      api.getProduct(params.productId).then(prod => prod)
    ])
    return {
      props: {
        product
      }
    }
  }

  catch (error) {
    return {
      props: {}
    }
  }
};

export default Product;