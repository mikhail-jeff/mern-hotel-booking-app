import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
	// query client
	const queryClient = useQueryClient();

	const { showToast } = useAppContext();

	const mutation = useMutation(apiClient.signOut, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("validateToken");
			showToast({ message: "Signed out", type: "SUCCESS" });
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const handleCLick = () => {
		mutation.mutate();
	};

	return (
		<button
			onClick={handleCLick}
			className="text-blue-600 px-3 rounded-md font-bold bg-white hover:bg-gray-100 ">
			Sign-out
		</button>
	);
};

export default SignOutButton;
