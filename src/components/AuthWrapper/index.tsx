import logo from "../../assets/logo.svg";

interface IAuthWrapperProps {
  infoText: string;
  children: React.ReactNode;
}

const AuthWrapper: React.FC<IAuthWrapperProps> = ({ infoText, children }) => {
  return (
    <div className="authorization">
      <img src={logo} alt="logo" className="authorization__logo" />

      <p className="authorization__info-text">{infoText}</p>
      {children}
    </div>
  );
};

export default AuthWrapper;
