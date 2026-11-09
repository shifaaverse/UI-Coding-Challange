import { useState } from "react"
import { useDispatch } from "react-redux"
import { addObject } from "../store/actions/ObjectAction"

function ObjectAdd() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [year, setYear] = useState(0)
    const [price, setPrice] = useState(0)
    const [cpu, setCpu] = useState("")

    const saveObject = async () => {
        let objectObj = {
            'name': name,
            'data': {
                'Year': Number(year),
                'Price': Number(price),
                'CPU': cpu
            }
        }
        try {
            await dispatch(addObject(objectObj))
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#objectForm" >
                +Add Object
            </button>

            <div className="modal fade" id="objectForm" data-bs-backdrop="static" data-bs-keyboard="false"   >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Object</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">

                            <div>
                                <label>Name</label>
                                <input type="text" onChange={(e) => setName(e.target.value)}
                                    className="form-control" required="required" />
                            </div>
                            <div>
                                <label>Year</label>
                                <input type="number" onChange={(e) => setYear(e.target.value)}
                                    className="form-control" required="required" />
                            </div>
                            <div>
                                <label>Price</label>
                                <input type="number" step="0.01" onChange={(e) => setPrice(e.target.value)}
                                    className="form-control" required="required" />
                            </div>
                            <div>
                                <label>CPU</label>
                                <input type="text" onChange={(e) => setCpu(e.target.value)}
                                    className="form-control" required="required" />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            <button type="button" className="btn btn-primary" onClick={() => saveObject()} data-bs-dismiss="modal">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ObjectAdd