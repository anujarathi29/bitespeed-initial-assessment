import "./style.css"
import { useState } from "react"
function Identify(props){

    const [contact, setContact] = useState();

    const handleSubmit = function (event) {
        event.preventDefault()
        var data = {
            email: event.target.email.value,
            phoneNumber: event.target.phoneNumber.value,
        }
        // console.log(data)
		fetch("/identify", {
			method :"POST",
			body : JSON.stringify(data),
			headers : {
				"Content-type": "application/json"
			}
		}).then(res => res.json())
		.then(data =>{
            setContact(data);
		})
		.catch(err => console.log(err))
    }

return (
    <div className="container-fluid m-5 p-5 d-flex align-items-center justify-content-center bg-light" style={{minHeight:"100vh"}}>

        <form onSubmit={handleSubmit}>
            <div className="input-group mb-5">
            <input type="text" className="form-control border border-1 border-light shadow" placeholder="email" id="email"/>
            <input type="text" className="form-control border border-1 border-light shadow" placeholder="phoneNumber" id="phoneNumber"/>
            <button className="btn btn-outline-danger rounded-2 border border-0 shadow">Identify</button>
            </div>
            <span className="fw-light">
                <pre>
                    {JSON.stringify(contact, null, "\t")}
                </pre>
            </span>
        </form>
        
    </div>
   
);
}

export default Identify;