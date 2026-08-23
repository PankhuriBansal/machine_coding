import { time } from "console"
import { useEffect, useRef, useState } from "react"


const OTPinput = ({
    length = 6,
    resendTime = 30,
    error = false,
    disabled = false,
    onSubmit,
    onResend
}: OtpInputProps) => {

    const [otp,setOtp] = useState(Array(length).fill(""))

    const [timeleft,setTimeLeft] = useState(resendTime)

    // const {inputRefs} = useRef([])
     const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    // focus on first input
    useEffect(() => {
        inputRefs?.current[0]?.focus()
    },[])

    const handleChange = (index,value) => {
        if(disabled) return

        if(!/^\d*$/.test(value)) {
            return
        }

        const digit = value.slice(-1)

        const newOtp = [...otp]

        newOtp[index] = digit

        setOtp(newOtp)

        if(digit &&  index < length -1){
            inputRefs.current[index+1]?.focus
        }

        if(digit && index === length - 1){
            const finalOtp = newOtp.join("")

            if(finalOtp.length === length){
                onSubmit(finalOtp)
            }
        }
    }


    return (
        <div>
            {otp?.map((digit,index) =>(
                <input
                    key={index}
                    type= "text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange = {(e) => handleChange(index,e.target.value)}
                    // onKeyDown={(e) => handleKeyDown(e,index)}
                />
            ))}
            {
                error && (
                    <p>
                        "OTP is not valid now"
                    </p>
                )
            }
            {/* resend logic and buttons*/}
            {
                timeleft > 0 ? (
                    <div>
                        "Resend otp in {timeleft}"

                    </div>
                ) : (
                    <button type="button" disabled={disabled} 
                    // onClick={handleResend} 
                    >
                        Resend OTP
                    </button>
                )
            }
        </div>
    )
}

export default OTPinput