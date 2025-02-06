interface InputFieldProps {
    name: string;
    value: string;
    onChange: (event: any) => void;
  };
  
  function InputField(props: InputFieldProps) {
    return (
      <>
        <div id="input-field" className = "column">
          <h4>{props.name}</h4>
          <input type="text" />
        </div>
      </>
    );
  }
  
  export default InputField;