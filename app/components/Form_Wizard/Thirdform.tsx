const ThirdForm = ({ values, handleChange, prevStep, onsubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if(values.password){
        onsubmit()
    }
    else{
        alert("Password is required")
    }
  }

  return (
    <>
      <h2>Step 3</h2>
      <input
        value={values.password}
        type="password"
        onChange={handleChange("password")}
        placeholder="Set Password"
      />
      <button onClick={prevStep}>Previous</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default ThirdForm;
