interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  change: (event: any) => void;
  isLogin: boolean;
};

function InputField(props: InputFieldProps) {
  return (
    <>
      <div id='input-field-login' className="column">
        <h4>{props.label}</h4>
        <input
          type="text"
          name={props.name}
          value={props.value}
          onChange={props.change}
        />
      </div>
    </>
  );
}

export default InputField;