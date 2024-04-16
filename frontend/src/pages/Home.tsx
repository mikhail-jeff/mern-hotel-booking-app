import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LastestDestinationCard from "../components/LastestDestinationCard";
import { Suspense } from "react";

const Home = () => {
	const { data: hotels } = useQuery("fetchHotels", () => apiClient.fetchHotels(), {
		staleTime: 0,
	});

	const topRowHotels = hotels?.slice(0, 2) || [];
	const bottomRowHotels = hotels?.slice(2) || [];

	return (
		<div className="">
			<h2 className="text-3xl font-bold">Latest Destinations</h2>
			<p>Most recent destinations added by our hosts</p>

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
					{bottomRowHotels.map((hotel, index) => (
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
