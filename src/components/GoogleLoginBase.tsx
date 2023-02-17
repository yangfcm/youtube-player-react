import { useState } from "react";
import { gapi } from "gapi-script";

function GoogleIcon({ active = true }: { active?: boolean }) {
  return (
    <div
      style={{
        background: active ? "#eee" : "#fff",
        padding: "6px",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000" fillRule="evenodd">
          <path
            d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
            fill="#EA4335"
          />
          <path
            d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
            fill="#4285F4"
          />
          <path
            d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
            fill="#FBBC05"
          />
          <path
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
            fill="#34A853"
          />
          <path fill="none" d="M0 0h18v18H0z" />
        </g>
      </svg>
    </div>
  );
}

interface AuthResponse {
  readonly access_token: string;
  readonly id_token: string;
  readonly login_hint: string;
  readonly scope: string;
  readonly expires_in: number;
  readonly first_issued_at: number;
  readonly expires_at: number;
}

interface BasicProfile {
  getId(): string;
  getEmail(): string;
  getName(): string;
  getGivenName(): string;
  getFamilyName(): string;
  getImageUrl(): string;
}

// Based on https://developers.google.com/identity/sign-in/web/reference
export interface GoogleLoginResponse {
  getBasicProfile(): BasicProfile;
  getAuthResponse(includeAuthorizationData?: boolean): AuthResponse;
}

type GoogleLoginPropsType = {
  onSuccess: (res?: GoogleLoginResponse) => void;
  onFailure?: () => void;
  isLoggedIn: boolean;
  active?: boolean;
  children?: React.ReactNode;
  buttonText?: string;
  theme?: "dark" | "light";
  disabled?: boolean;
  disabledStyle?: Record<string, any>;
  isSignedIn?: boolean;
};
export function GoogleLoginBase(props: GoogleLoginPropsType) {
  const {
    isLoggedIn,
    theme = "light",
    disabled = false,
    disabledStyle = { opacity: 0.6 },
    buttonText,
    children,
    onSuccess,
    onFailure,
  } = props;

  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const initialStyle = {
    backgroundColor: theme === "dark" ? "rgb(66, 133, 244)" : "#fff",
    display: "inline-flex",
    alignItems: "center",
    color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, .54)",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",
    padding: 0,
    borderRadius: 2,
    border: "1px solid transparent",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
  };

  const hoveredStyle = {
    cursor: "pointer",
    opacity: 0.9,
  };

  const activeStyle = {
    cursor: "pointer",
    backgroundColor: theme === "dark" ? "#3367D6" : "#eee",
    color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, .54)",
    opacity: 1,
  };

  const defaultStyle = (() => {
    if (disabled) {
      return Object.assign({}, initialStyle, disabledStyle);
    }

    if (active) {
      if (theme === "dark") {
        return Object.assign({}, initialStyle, activeStyle);
      }

      return Object.assign({}, initialStyle, activeStyle);
    }

    if (hovered) {
      return Object.assign({}, initialStyle, hoveredStyle);
    }

    return initialStyle;
  })();

  const login = async () => {
    const googleAuth = gapi?.auth2.getAuthInstance();
    if (!googleAuth) return;
    try {
      const res = await googleAuth.signIn({ prompt: "" });
      onSuccess(res);
    } catch (err) {
      onFailure && onFailure();
    }
  };

  const logout = async () => {
    const googleAuth = gapi?.auth2.getAuthInstance();
    try {
      await googleAuth.signOut();
      googleAuth.disconnect();
      onSuccess();
    } catch (err) {
      onFailure && onFailure();
    }
  };

  const handleClickButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isLoggedIn) logout();
    else login();
  };

  return (
    <div
      style={defaultStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      <GoogleIcon active={active} />
      <span
        style={{
          padding: 10,
          fontWeight: 500,
        }}
        onClick={handleClickButton}
      >
        {children || buttonText}
      </span>
    </div>
  );
}
