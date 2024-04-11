export type Props = {
	page: number;
	pages: number;
	onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
	const pageNumbers = [];

	for (let i = 1; i <= pages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="flex justify-center">
			<ul className="flex">
				{pageNumbers.map((number, index) => (
					<li
						key={index}
						className={`px-3 py-1 border border-gray-400 shadow-sm ${page === number ? "bg-slate-300" : ""}`}>
						<button onClick={() => onPageChange(number)}>{number}</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pagination;
