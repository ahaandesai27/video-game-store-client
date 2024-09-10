import Navbar from './Navbar';
import {useUser} from '../context/usercontext';

export default function Homepage() {
    const { userId } = useUser();
    console.log(userId);
    return (
        <div>
            <Navbar />
            <div className="text-center pt-10 text-white text-4xl">Home Page </div>
        </div>
    );
}
