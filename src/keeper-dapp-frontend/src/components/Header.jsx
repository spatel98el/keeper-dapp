import "./../index.scss";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

function Header(props) {
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper app
      </h1>
      {props.isValid && (
        <div>
          <PersonIcon className="header-person-icon " />
          <span className="header-user-greeting">{props.userName}</span>
          <LogoutIcon onClick={()=>{props.onLogout()}} style={{ color: "white" }} />
        </div>
      )}
    </header>
  );
}

export default Header;
