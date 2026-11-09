import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getObjects } from "../store/actions/ObjectAction"
import ObjectAdd from "./ObjectAdd"
import ObjectList from "./ObjectList"

function ObjectsDashboard() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getObjects())
    }, [])

    return (
        <div className="container-fluid">
            <div className="mb-4 mt-4 d-flex justify-content-between">
                <h2>Objects Dashboard</h2>
                <ObjectAdd />
            </div>

            <ObjectList />
        </div>
    )
}

export default ObjectsDashboard