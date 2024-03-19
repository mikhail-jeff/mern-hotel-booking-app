import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
	email: string;
	password: string;
};

const SignIn = () => {
	// query client
	const queryClient = useQueryClient();

	// app context hook
	const { showToast } = useAppContext();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>();

	// react-query
	const mutation = useMutation(apiClient.signIn, {
		onSuccess: async () => {
			showToast({ message: "Sign-in successful", type: "SUCCESS" });
			await queryClient.invalidateQueries("validateToken");
			navigate("/");
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<form
			className="flex flex-col gap-5 p-2"
			onSubmit={onSubmit}>
			<h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>

			<label className="text-gray-700 text-sm font-bold flex-1">
				Email
				<input
					type="email"
					className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
					{...register("email", { required: "This field is required" })}
				/>
				{errors.email && <span className="text-red-500 text-xs pt-1">{errors.email.message}</span>}
			</label>

			<label className="text-gray-700 text-sm font-bold flex-1">
				Password
				<input
					type="password"
					className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 5,
							message: "Password must be at least 5 characters",
						},
					})}
				/>
				{errors.password && <span className="text-red-500 text-xs pt-1">{errors.password.message}</span>}
			</label>

			<span className="flex justify-between items-center">
				<span className="text-sm">
					Not registered yet?{" "}
					<Link
						to={"/register"}
						className="underline">
						Sign-up here
					</Link>
				</span>
				<button
					type="submit"
					className="bg-blue-600 rounded-sm text-white p-2 font-bold hover:bg-blue-500 text-lg">
					Login
				</button>
			</span>
		</form>
	);
};

export default SignIn;
