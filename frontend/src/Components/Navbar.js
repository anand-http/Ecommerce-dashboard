import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    function logoutfunc() {
        localStorage.clear();
    }
    return (
        <div className="Nav">
            <img className='logo' src="https://d1wnwqwep8qkqc.cloudfront.net/uploads/stage/stage_image/64230/optimized_large_thumb_stage.jpg" alt="logo" />
            {auth ? <ul className='navUl'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/addProducts">Add Products</Link></li>
                <li><Link onClick={logoutfunc} to="/signup">Logout {JSON.parse(auth).name} </Link></li>
            </ul> :

                <ul className='navUl nav-right'>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>

            }


        </div >
    );
}

export default Navbar;