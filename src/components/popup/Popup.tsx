import "./Popup.css";

interface PopupProps {
  content: any;
  handleClose: () => void;
}

export const Popup = (props: PopupProps) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
