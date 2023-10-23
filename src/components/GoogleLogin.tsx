import { doc, setDoc } from "firebase/firestore";
import { GoogleLoginBase, GoogleLoginResponse } from "./GoogleLoginBase";
import { useAuth } from "../features/user/useAuth";
import { db } from "../settings/firebaseConfig";

export function GoogleLogin() {
  const { signin, signout, isGoogleAuthEnabled } = useAuth();

  const handleSuccessSignin = async (response?: GoogleLoginResponse) => {
    const auth = (response as GoogleLoginResponse).getAuthResponse();
    const userProfile = (response as GoogleLoginResponse).getBasicProfile();
    const user = {
      id: userProfile.getId(),
      firstName: userProfile.getGivenName(),
      lastName: userProfile.getFamilyName(),
      email: userProfile.getEmail(),
      avatar: userProfile.getImageUrl(),
      username: userProfile.getName(),
    };
    signin(
      user,
      auth.access_token,
      auth.expires_at
    );
    await setDoc(doc(db, 'users', user.id), {
      ...user,
      accessToken: auth.access_token,
      lastLogin: (new Date()).getTime()
    }, { merge: true });
  };

  const handleFailureSignin = () => {
    signout();
  };

  return (
    <GoogleLoginBase
      disabled={!isGoogleAuthEnabled}
      isLoggedIn={false}
      buttonText="Log in"
      onSuccess={handleSuccessSignin}
      onFailure={handleFailureSignin}
    />
  );
}
