import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

function UpdateProduct() {

    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [company, setcompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetail();
    }, [])

    const getProductDetail = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setname(result.name);
        setprice(result.price);
        setcategory(result.category);
        setcompany(result.company);
    };


    const updateproductfunc = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, category, company }),
            headers:
            {
                "Content-Type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        navigate('/');
    }

    return (
        <div className="addproduct">
            <h1>Update Product</h1>
            <br /> <br />
            <div className="inputfield">

                <input type="text" placeholder='Enter product name' value={name}
                    onChange={(e) => { setname(e.target.value) }} />



                <input type="text" placeholder='Enter product price ' value={price}
                    onChange={(e) => { setprice(e.target.value) }} />



                <input type="text" placeholder='Enter product category' value={category}
                    onChange={(e) => { setcategory(e.target.value) }} />


                <input type="text" placeholder='Enter product company' value={company}
                    onChange={(e) => { setcompany(e.target.value) }} />


                <button onClick={updateproductfunc} className='btn'>UpdProduct</button>

            </div>
        </div>
    );
}

export default UpdateProduct;