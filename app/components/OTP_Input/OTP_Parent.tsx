"use client"
import { useState } from "react"
import OTPinput from "./OTPinput"

const OTPParent = () => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    const verifyOTP = async(otp: string) => {
        await new Promise((resolve) => {
            setTimeout(resolve,1000)
        })

        return {
            success: otp === '123456'
        }
    }

    const handleVerifyOtp = async(otp: string) => {
        setError(false)
        setLoading(true)

        try{
            const response = await verifyOTP(otp)
            
            
            
            // ("/api/verify-otp",{
            //     method: "POST",
            //     headers: {
            //         "Content-type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         otp
            //     })
            // })
            // const data = await response.json()

            if(!response.success){
                setError(true)
                return
            }

            console.log("OTP verified")
        }
        catch{
            console.log(error)
            setError(true)
        }
        finally{
            setLoading(false)
        }

    }

    const handleResendOtp = async() => {
        setLoading(true)
        setError(false)

        try{
            await fetch("/post/resent-otp",{
                method: "POST"
            })
            console.log("otp resend done")
        }
        catch{
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Verify OTP</h1>
            <div>
                <OTPinput
                    length = {6}
                    resendTime = {30}
                    error = {error}
                    disabled = {loading}
                    onSubmit = {handleVerifyOtp}
                    onResend = {handleResendOtp}
                />
            </div>
        </div>
    )
}

export default OTPParent