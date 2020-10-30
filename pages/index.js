import React, {useContext, useState, useEffect} from 'react';
import {ProductsContext} from '../context/context.js';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import Main from '../components/Main';
import Extra from '../components/Extra';
import Description from '../components/Description';
import MainCatalog from '../components/MainCatalog';
import SocialBlock from '../components/SocialBlock';
import MobSocial from '../components/MobSocial';
import MobExtra from '../components/MobExtra/index.js';
import VideoPlayer from '../components/VideoPlayer/index.js';

import apiProduct from '../api/apiProducts';

const api = new apiProduct();

const App = () => {
  const context = useContext(ProductsContext);
  const [ hero, setHero ] = useState();
  const [ extra, setExtra ] = useState();

  useEffect(() => {
    api.getHome().then( home => {
      setHero(home.hero);
      setExtra(home.extra);
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {hero ? <Main hero={hero} /> : null}
      {
        extra ? 
        <>
          { context.desktop ? <Extra extra={extra} /> : <MobExtra extra={extra} /> }
        </>
        : null
      }
      {extra ? <VideoPlayer url={extra.video_url} /> : null}
      { context.desktop ? <MainCatalog /> : <MobExtra /> }
      { context.desktop ? <Description /> : <Description /> }
      { context.desktop ? <SocialBlock /> : <MobSocial /> }
    </Layout>
  )
};

export default App;

// redeploy