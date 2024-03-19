import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<div className="bg-blue-800 py-6">
			<div className="container mx-auto flex justify-between">
				<span className="text-3xl text-white font-bold tracking-tight">
					<Link to={"/"}>Booking.com</Link>
				</span>

				<span className="flex space-x-2">
					{isLoggedIn ? (
						<>
							<Link
								className="flex items-center rounded-md text-white px-2 font-bold hover:bg-blue-500"
								to={"/my-bookings"}>
								MyBookings
							</Link>
							<Link
								className="flex items-center rounded-md text-white px-2 font-bold hover:bg-blue-500"
								to={"/my-hotels"}>
								MyHotels
							</Link>
							<SignOutButton />
						</>
					) : (
						<Link
							to={"/sign-in"}
							className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white rounded-sm">
							Sign In
						</Link>
					)}
				</span>
			</div>
		</div>
	);
};

export default Header;
