import {Form, Button} from "react-bootstrap"
import Rating from "./Rating"
import {useState} from "react"
const Filter = () => {
    const [rate,setRate] = useState(3)
    return (
        <div className="filters">
            <span className="title">Filter Products</span>
            <span>
                {/* for radio button */}
                <Form.Check
                    inline
                    label="Ascending"
                    name="group1"
                    type="radio"
                    id={`inline-1`}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Descending"
                    name="group1"
                    type="radio"
                    id={`inline-1`}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Include Out of Stocks"
                    name="group1"
                    type="checkbox"
                    id={`inline-3`}
                />
            </span>
             <span>
                <Form.Check
                    inline
                    label="Fast Delivery Only"
                    name="group1"
                    type="checkbox"
                    id={`inline-4`}
                />  
            </span>
            <span>
                <label style={{paddingRight: 10}}>Rating:</label>
                <Rating onClick = {(i) => setRate(i+1)} rating={rate} style={{cursor: "pointer"}} />
            </span>
            <Button variant="light">Clear Filters</Button>
        </div>
    )
}

export default Filter;
