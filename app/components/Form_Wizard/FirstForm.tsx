const FirstForm = ({
    values,
    handleChange,
    nextStep
}) => {
    const continueStep = (e) => {
        e.preventDefault()
        if(!values.name.trim() || !values.email.trim()){
             alert("All Fields are required");
             return
        }
        
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!emailRegex.test(values.email)){
            alert("Please enter a valid email address")
            return
         }
        nextStep()
    }
    return (
        <div>
            <h2>User Info</h2>
            <input type="text" placeholder="Name" value={values.name} onChange={handleChange("name")}/>
            <input type="email" placeholder="Email" value={values.email} onChange={handleChange("email")}/>
            <button onClick={continueStep}>Next</button>
        </div>
    )
}

export default FirstForm