import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/store';
import Default from '@/layouts/Default';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <BrowserRouter>
      <Default />
    </BrowserRouter>
  </ReduxProvider>,
  // React.StrictMode>
);
