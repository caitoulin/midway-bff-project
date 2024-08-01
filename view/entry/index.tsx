/*
 * @Author: yihe.cl
 * @Date: 2024-07-31 16:33:35
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '../ui/App';

const rootDom = document.getElementById('root');

if (rootDom) {
  const root = createRoot(rootDom);

  root.render(<App />);

  if (module.hot) {
    console.log('module.hot', module.hot);
    module.hot.accept('../ui/App.tsx', () => {
      const HotApp = require('../ui/App.tsx').default;
      root.render(<HotApp />);
    });
  }
} else {
  console.error('Root element not found');
}
