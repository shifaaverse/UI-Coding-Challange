import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteObject } from "../store/actions/ObjectAction"

function ObjectList() {
    const list = useSelector(state => state.objects)
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const size = 10

    const pageList = list.slice((page - 1) * size, page * size)
    const totalPages = Math.ceil(list.length / size)

    const onDelete = async (id) => {
        try {
            await dispatch(deleteObject(id))
            // if the last card on this page was deleted, go back one page
            if (pageList.length === 1 && page > 1) {
                setPage(page - 1)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-3 g-3">
                {
                    pageList?.map((o) => {
                        // data can be null, and key names differ between objects
                        const d = o.data || {}
                        const color = d.color ?? d.Color ?? "N/A"
                        const price = d.price ?? d.Price ?? "N/A"
                        const cpu = d["CPU model"] ?? d.CPU ?? "N/A"

                        return (
                            <div className="col" key={o.id}>
                                <div className="card h-100">
                                    <div className="card-header fw-bold">{o.name}</div>
                                    <div className="card-body">
                                        <p className="card-text mb-1">Color: {color}</p>
                                        <p className="card-text mb-1">Price: {price}</p>
                                        <p className="card-text mb-1">CPU: {cpu}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(o.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <nav aria-label="Page navigation example" style={{ "alignContent": 'center' }}>
                <ul className="pagination justify-content-center mt-4">
                    {/* PREVIOUS BUTTON */}
                    <li className="page-item">
                        <button className="page-link"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}>
                            Previous
                        </button></li>

                    {
                        Array.from({ length: totalPages }, (e, index) => (
                            <li key={index}
                                className={`page-item ${page === index + 1 ? "active" : ""}`}>
                                <button className="page-link"
                                    onClick={() => setPage(index + 1)}>
                                    {index + 1}
                                </button></li>
                        ))}

                    {/* NEXT BUTTON */}
                    <li className="page-item">
                        <button className="page-link"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}>
                            Next
                        </button></li>
                </ul>
                <p className="text-center">{`Page ${page} of ${totalPages} total pages`}</p>
                <p className="text-center">{`Showing ${pageList.length} records from total ${list.length} records`}</p>
            </nav>
        </div>
    )
}

export default ObjectList