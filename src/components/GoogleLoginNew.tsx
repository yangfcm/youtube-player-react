 import { useContext } from 'react';
 import { GoogleAuthContext } from './GoogleAuthProviderNew';

export function GoogleLoginNew() { 

  const context = useContext(GoogleAuthContext);
  console.log(context);

  const handleLogin = () => {
    if(!context) return;
    context.client.requestAccessToken();
  }

  return (
    <button onClick={handleLogin}>Login with Google</button>
  )
}