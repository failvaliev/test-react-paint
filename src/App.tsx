import React, { Suspense } from 'react';
import { Canvas } from './components/Canvas/Canvas';

export const App = () => {

  return (
    <Suspense fallback={null}>
      <Canvas />
    </Suspense>
  );
}