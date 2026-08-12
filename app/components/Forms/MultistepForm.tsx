"use client"

import { useState } from "react"
import FirstForm from "./FirstForm"
import SecondForm from "./SecondForm"
import ThirdForm from "./Thirdform"
import ProgressBar from "./ProgressBar"

const MultistepForm = () => {
    const [step,setStep] = useState(1)
    const [formData,setFormData] = useState({
        name: "",
        email: "",
        city: "",
        country: "",
        password: ""
    })
    const nextStep = () => setStep((prev) => prev+1)
    const prevStep = () => setStep((prev) => prev - 1)

    const handleChange = (input) => {
        return (e) => {
            setFormData({
                ...formData,
                [input]: e.target.value
            })
        }
    }

    const onSubmit = (e) => {
        console.log("values filled and form submitted",formData)
        setFormData({
        name: "",
        email: "",
        city: "",
        country: "",
        password: ""
    })
    setStep(1)
    }

    return(
        <div>
            <ProgressBar step={step} setStep={setStep}/>
            {
                step === 1 && <FirstForm values={formData} handleChange={handleChange} nextStep={nextStep}/>
            }
            {
                step === 2 && <SecondForm values={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep}/>
            }
            {
                step === 3 && <ThirdForm values={formData} handleChange={handleChange} prevStep={prevStep} onsubmit={onSubmit}/>
            }
        </div>
    )
}

export default MultistepForm