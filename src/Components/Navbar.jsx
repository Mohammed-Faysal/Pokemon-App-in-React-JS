import { Link, Outlet, useLocation } from 'react-router-dom';
import {providerCtx} from '../Context/SearchBarCtx'

const Navbar = () => {

    const location = useLocation();  // Get the current route location

    const {catchVal, setCatchVal} = providerCtx()

    const handleChange = (e) => {
        setCatchVal(e.target.value)
    }

    return (
        <div>
            <nav className=' fixed top-0 left-0 w-full z-10 shadow-md bg-gray-200'>
                <div className='max-w-[1090px] m-auto flex justify-between items-center'>
                    <ul className='flex justify-start items-center gap-4 py-3'>
                        <li className={`rounded-lg bg-white border-2 ${location.pathname === '/' ? 'border-blue-500' : ''}`}>
                            <Link to="/" className='inline-block py-2 px-5'>Home</Link>
                        </li>
                        <li className={`rounded-lg bg-white border-2 ${location.pathname === '/favourite' ? 'border-blue-500' : ''}`}>
                            <Link to="/favourite" className='inline-block py-2 px-5'>Favourite</Link>
                        </li>
                    </ul>
                    <div>
                        <input 
                            type="text" 
                            placeholder='Search Pokémon'
                            className='py-2 px-5 rounded-lg bg-white border-2 outline-none focus:border-2 focus:border-blue-500'
                            value={catchVal}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </nav>

            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;

