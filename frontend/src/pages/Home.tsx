import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LastestDestinationCard from "../components/LastestDestinationCard";
import { Suspense } from "react";

const Home = () => {
	const { data: hotels } = useQuery("fetchHotels", () => apiClient.fetchHotels(), {
		staleTime: 0,
	});

	const topRowHotels = hotels?.slice(0, 2) || [];
	const middleRowHotels = hotels?.slice(2, 5) || [];
	const lastRowHotels = hotels?.slice(5) || [];

	return (
		<div className="">
			<h2 className="text-3xl font-bold">Discover Fresh Destinations</h2>
			<p>Find out about the newest destinations recently added by our hosts</p>

			<div className="grid gap-4">
				<div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-6">
					{topRowHotels.map((hotel, index) => (
						<Suspense
							key={index}
							fallback={<div>Loading...</div>}>
							<LastestDestinationCard hotel={hotel} />
						</Suspense>
					))}
				</div>
				<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
					{middleRowHotels.map((hotel, index) => (
						<Suspense
							key={index}
							fallback={<div>Loading...</div>}>
							<LastestDestinationCard hotel={hotel} />
						</Suspense>
					))}
				</div>
				<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
					{lastRowHotels.map((hotel, index) => (
						<Suspense
							key={index}
							fallback={<div>Loading...</div>}>
							<LastestDestinationCard hotel={hotel} />
						</Suspense>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
