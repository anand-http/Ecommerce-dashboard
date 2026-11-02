import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductList();
    }, [])

    const getProductList = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }


    const delProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProductList();
        }
    }

    const searching = async (e) => {
        let key = e.target.value;
        if (key) {

            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        }
        else {
            getProductList();
        }
    }

    return (
        <div className="productslist">
            <h1>Products List</h1>
            <input type="text" className='searchbox' onChange={searching} placeholder='search' />
            <br />
            <br />
            <br />

            <ul>
                <li>Sno.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Action</li>
                <li>Action</li>
            </ul>

            {

                products.length > 0 ? products.map((item, index) =>


                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => delProduct(item._id)} className='delbtn'>Delete</button></li>
                        <li><Link to={"/updateProducts/" + item._id}>Update</Link></li>
                    </ul>

                )
                    : <h1>NO result found</h1>
            }





        </div>
    )
}

export default ProductsList;