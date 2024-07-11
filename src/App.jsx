import { NotificationContainer } from 'react-notifications';
import './App.css';
import { Router } from './router/Router';
import 'react-notifications/lib/notifications.css';
import './customNotification.css';

function App() {
  return (
    <div className="App">
      <Router />
      <NotificationContainer />
    </div>
  );
}

export default App;
