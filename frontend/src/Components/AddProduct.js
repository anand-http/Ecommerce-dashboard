import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [company, setcompany] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const addproductfunc = async () => {

        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }


        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/addProduct', {
            method: "POST",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        if (result) {
            navigate('/')
        }
    }

    return (
        <div className="addproduct">
            <h1>Add Product</h1>
            <br /> <br />
            <div className="inputfield">

                <input type="text" placeholder='Enter product name' value={name}
                    onChange={(e) => { setname(e.target.value) }} />

                {error && !name && <span className='invalid'>Enter Valid Name</span>}


                <input type="text" placeholder='Enter product price ' value={price}
                    onChange={(e) => { setprice(e.target.value) }} />
                {error && !price && <span className='invalid'>Enter Valid Price</span>}



                <input type="text" placeholder='Enter product category' value={category}
                    onChange={(e) => { setcategory(e.target.value) }} />
                {error && !category && <span className='invalid'>Enter Valid Category</span>}


                <input type="text" placeholder='Enter product company' value={company}
                    onChange={(e) => { setcompany(e.target.value) }} />
                {error && !company && <span className='invalid'>Enter Valid Company</span>}


                <button onClick={addproductfunc} className='btn'>AddProduct</button>
            </div>
        </div>
    );
}

export default AddProduct;