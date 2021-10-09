import * as React from 'react';
import { init } from './components/helpers/db'
import AppContainer from './components/screens/AppContainer';
init().then(() => {
}).catch(err => {
})
export default function App() {
  return (
    <AppContainer></AppContainer>
  );
}



