const ProgressBar = ({
    step,setStep
}) => {
    const steps = [
        {
            id: 1,
            title: "user info"
        },
        {
            id: 2,
            title: "location"
        },
        {
            id: 3,
            title: "password"
        },
        {
            id: 4,
            title: "Review"
        },
    ]

    return(
        steps?.map((item) => {
            const isActive = step === item?.id
            const isCompleted = step > item?.id

            return (
                <button
                    key={item.id}
                    onClick={()=>{
                        if( item?.id < step )
                        setStep(item?.id)
                    }}
                    disabled={item?.id > step}
                >
                    {isCompleted ? "✓" : item?.id} {"--------------"}
                    {/* {item?.title}  */}
                </button>
            )
        })
    )
}

export default ProgressBar