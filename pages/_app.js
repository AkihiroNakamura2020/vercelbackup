import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

import Layout from '../components/Layout';

import Router from 'next/router';
import { useState } from 'react';
import Loader from '../components/Loader';
//import  NProgress  from 'nprogress';
import NextNProgress from "nextjs-progressbar";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const [loading,setLoading]=useState(false)
  const [finloading,setfinLoading]=useState(false)

  Router.events.on("routeChangeStart",(url)=>{
    console.log('Route is changing..');
    //NProgress.start()
    setLoading(true)
  })

  Router.events.on("routeChangeComplete",(url)=>{
    if(!finloading){
      console.log('Route is changed');
      //NProgress.done()
      setLoading(false)
      setfinLoading(true)

    }
  })
  //console.log("app0");
  //console.log(props);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  //console.log("app");

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        
          <CssBaseline />
      
        <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />

        <Layout>
          {loading&&<Loader />}
          <Component {...pageProps} />
        </Layout>
        
      </ThemeProvider>
    </CacheProvider>
  );
}
//console.log("app2");

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};