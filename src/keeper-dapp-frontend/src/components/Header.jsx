import "./../index.scss";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";

function Header(props) {
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper app
      </h1>
      {props.isValid && <LogoutIcon onClick={()=>{props.onLogout()}} style={{ color: "white" }} />}
    </header>
  );
}

export default Header;
