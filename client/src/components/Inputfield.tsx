interface InputFieldProps {
    name: string;
    value: string;
    change: (event: any) => void;
    isLogin: boolean;
  };
  
  function InputField(props: InputFieldProps) {
    return (
      <>
        <div id={props.isLogin ? "input-field-login" : "input-field-signup"} className = "column">
          <h4>{props.name}</h4>
          <input type="text" onChange={props.change}/>
        </div>
      </>
    );
  }
  
  export default InputField;