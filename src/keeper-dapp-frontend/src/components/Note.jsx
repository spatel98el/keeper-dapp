import "./../index.scss";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
    return (
        <div className='note'>
            <h1> {props.title}</h1>
            <p>{props.content}</p>
            <button onClick={(e)=>{props.onDeleteNote({key : props.key, title: props.title, content: props.content})}}>
                <DeleteIcon />
            </button>
        </div>
    );
}

export default Note;