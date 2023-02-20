import { GoogleLoginBase, GoogleLoginResponse } from "./GoogleLoginBase";
import { useAuth } from "../features/user/useAuth";

export function GoogleLogin() {
  const { signin, signout, isGoogleAuthEnabled } = useAuth();

  const handleSuccessSignin = (response?: GoogleLoginResponse) => {
    const auth = (response as GoogleLoginResponse).getAuthResponse();
    const userProfile = (response as GoogleLoginResponse).getBasicProfile();
    signin(
      {
        id: userProfile.getId(),
        firstName: userProfile.getGivenName(),
        lastName: userProfile.getFamilyName(),
        email: userProfile.getEmail(),
        avatar: userProfile.getImageUrl(),
        username: userProfile.getName(),
      },
      auth.access_token,
      auth.expires_at
    );
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
