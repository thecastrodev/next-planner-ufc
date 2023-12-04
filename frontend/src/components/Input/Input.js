import "./Input.style.css";

export default function Input({ title, name, type, placeholder }) {
  return (
    <div className="div-input">
      <label htmlFor={name}>{title}: </label>
      <input type={type} name={name} placeholder={placeholder} />
    </div>
  );
}
