import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { Provider } from 'react-redux';
import { appStore } from '../../redux/store';
import { render } from '@testing-library/react';

it('Should load Header Component with login button', () => {
  //Render the Header component to jsdom
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
});
