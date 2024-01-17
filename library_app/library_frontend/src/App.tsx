import React from 'react';
import './App.css';
import Navbar from './components/NavbarAndFooter/Navbar';
import { Footer } from './components/NavbarAndFooter/Footer';
import { HomePage } from './components/HomePage';
import { SearchBooksPage } from './components/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CheckoutPage } from './components/CheckoutPage/CheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './components/CheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './components/ShelfPage/ShelfPage';
import { MessagesPage } from './components/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './components/ManageLibraryPage/ManageLibraryPage';


const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  
  const customAuthHandler = () => {
    history.push("/login");
  }

  const history = useHistory();

  const restoreOriginUri = async (_oktaAuth:any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginUri} onAuthRequired={customAuthHandler} >
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBooksPage />
          </Route>
          <Route path="/reviewlist/:bookId">
            <ReviewListPage />
          </Route>
          <Route path="/checkout/:bookId">
            <CheckoutPage/>
          </Route>
          <Route path='/login' render={ () => 
             <LoginWidget config={oktaConfig}/>
          }/>
          <Route path="/login.callback" component={LoginCallback}/>
          <SecureRoute path="/shelf"><ShelfPage/></SecureRoute>
          <SecureRoute path="/messages"><MessagesPage/></SecureRoute>
          <SecureRoute path="/admin"><ManageLibraryPage/></SecureRoute>
        </Switch>
      </div>
      <Footer />
      </Security>
    </div>
  );
}