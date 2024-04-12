type Props = {
	selectedPrice?: number;
	onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
	return (
		<div>
			<h4 className="text-md font-semibold mb-2">Max Price</h4>
			<select
				className="focus:outline-none border border-slate-300 p-2 shadow-sm w-full rounded-md"
				value={selectedPrice}
				onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : undefined)}>
				<option value="">Select Max Price</option>
				{[50, 100, 200, 300, 500, 1000, 1500, 2000].map((price, index) => (
					<option
						key={index}
						value={price}>
						{price}
					</option>
				))}
			</select>
		</div>
	);
};

export default PriceFilter;
