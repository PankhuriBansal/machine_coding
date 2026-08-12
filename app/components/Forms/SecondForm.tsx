const SecondForm = ({
    values,
    handleChange,
    nextStep,
    prevStep
}) => {

    const handleNextStep = (e) => {
        e.preventDefault()
        if(values.city.trim() && values.country.trim()){
            nextStep()
        }
        else{
            alert("All fields are required")
        }
    }
    return (
        <>
        <h2>Step 2</h2>
        <input type="text" value={values.city} onChange={handleChange("city")} placeholder="City"/>
        <input type="text" value={values.country} onChange={handleChange("country")} placeholder="Country"/>
        <button onClick={prevStep}>Previous</button>
        <button onClick={handleNextStep}>Next</button>
        </>
         )
}

export default SecondForm