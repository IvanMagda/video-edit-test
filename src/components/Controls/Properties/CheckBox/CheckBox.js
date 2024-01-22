import "./styles.scss";

const CheckBox = ({ label, onClick }) => {
  return (
    <label className="checkbox-labeled">
      <input className="checkbox" type="checkbox" onClick={onClick} />
      {label}
    </label>
  );
};

export default CheckBox;
