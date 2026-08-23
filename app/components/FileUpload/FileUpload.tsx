"use client"

import { useState } from "react"

const FileUpload = () => {
    const [file,setFile] = useState(null)
    const [status,setStatus] = useState('')
    const [fileList,setFileList] = useState([])

    const handleFileUpload = async(event) => {
        event.preventDefault()

        if(!file){
            setStatus("Please select a file")
            return
        }

        //formdata 
        const formData = new FormData()
        formData.append('file',file)

        try{
            setStatus("Uploading....")

            const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    });

            if(response.ok){
                setStatus("File uploaded")
                setFile(null)
            }
            else{
                setStatus("File not uploaded try agian")
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const handleFileChange = (event) => {
        const newFile = event.target.files[0]
        setFile(newFile)
        setStatus('')
    }
    return(
        <div>
            <form onSubmit={handleFileUpload}>
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                {
                    file && (
                        <div>
                            <p>Name:{file.name}</p>
                            <p>Size: {file.size}</p>
                        </div>
                    )
                }

                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default FileUpload