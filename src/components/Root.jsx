import React from 'react';
import Nav from './Nav';
import { CookiesProvider } from 'react-cookie';

export default function Root() {
  return (
    <CookiesProvider>
      <Nav />
    </CookiesProvider>
  );
}
