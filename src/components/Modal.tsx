import "./index.css";

interface Props {
  text: string;
  onClose?: () => any;
}

export const Modal = ({ text, onClose }: Props) => {
  return (
    <div className="modal">
      <p>{text}</p>
      <button className="btn btn--alt" onClick={onClose}>
        Cancel
      </button>
      <button className="btn" onClick={onClose}>
        Confirm
      </button>
    </div>
  );
};

export default Modal;
