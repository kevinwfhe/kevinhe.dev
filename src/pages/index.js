import React from 'react';
import { Helmet } from 'react-helmet';
import App from '../components/App';
import { META_DATA } from '../data';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.scss';

const Root = () => {
  const { title, lang, description } = META_DATA;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <html lang={lang || 'en'} />
        <meta name="description" content={description} />
      </Helmet>
      <App />
    </>
  );
};

export default Root;
