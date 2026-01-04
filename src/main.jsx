import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as AmplifyModules from 'aws-amplify';
import awsconfig from './aws-exports';
AmplifyModules.Amplify.configure(awsconfig);
import './index.css'
import App from './app.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
