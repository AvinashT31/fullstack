import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../Context/User.context';

const Updateproduct = () => {

    const { id } = useParams();
    console.log(id, "id heree");

    const [ProductData, setProductData] = useState();
    console.log(ProductData, "getProductData");

    const [isbuttonDisabled, setisbuttonDisabled] = useState(true);

    const { state } = useContext(AuthContext)
    console.log(state, "state")

    useEffect(() => {
        async function getProductData() {
            const response = await axios.post("http://localhost:8000/update-single-sell-product", { id })
            setProductData(response.data);
        }
        if (id) {
            getProductData();
        }
    }, [id])

    const handleclick = (e) => {
        setProductData({ ...ProductData, [e.target.name]: e.target.value })
        setisbuttonDisabled(false)
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (ProductData.image && ProductData.name && ProductData.price && state?.user?._id) {
            console.log(state?.user?._id, "stateuser")
            const response = await axios.post("http://localhost:8000/update-product", {
                id: ProductData._id,
                name: ProductData.name,
                image: ProductData.image,
                price: ProductData.price,
                userId: state?.user?._id
            })
            if (response.data.status === "success") {
                setProductData(response.data.data)
                alert(response.data.message);
            }
            else {
                alert("internal error")
            }
        }
        else {
            alert("please fill all field")
        }
    }

    return (
        <>
            {ProductData ?
                <div>
                    <div>
                        <img src={ProductData.image} alt="" />
                    </div>
                    <h4>Update Product</h4>
                    <form onSubmit={handlesubmit}>
                        <label >Enter Your Product Name</label>
                        <br />
                        <input onChange={handleclick} name='name' value={ProductData.name} type="text" />
                        <br />
                        <label >Enter Your Product image_URL</label>
                        <br />
                        <input onChange={handleclick} name='image' value={ProductData.image} type="text" />
                        <br />
                        <label>Enter Your Price</label>
                        <br />
                        <input onChange={handleclick} name='price' value={ProductData.price} type="number" />
                        <br />
                        <input className='btn' disabled={isbuttonDisabled} type="submit" value="Update Details" />
                    </form>
                </div> :
                <h1>Loading....</h1>
            }
        </>
    )
}

export default Updateproduct
