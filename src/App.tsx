import React, { Suspense } from 'react';
import { Paint } from './components/Paint/Paint';

export const App = () => {
  return (
    <Suspense fallback={'Что-то не то случилось...'}>
      <Paint />
    </Suspense>
  );
}