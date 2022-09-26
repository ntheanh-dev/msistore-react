import ProductDetail from "~/components/ProductDetail";

import { useEffect, useState } from "react";

function ProductView() {

    const [data, setData] = useState('')

    useEffect(() => {
        const fetAPI = async () => {
            const responceJSON = await fetch('http://localhost:3000/api/data/2')
            const responce = await responceJSON.json()
            setData(responce)
        }

        fetAPI()
    }, [])
    return (
        <div>
            {data && (
                <ProductDetail
                    data={data}
                />
            )}
        </div>
    );
}

export default ProductView;