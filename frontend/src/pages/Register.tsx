import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	// query client
	const queryClient = useQueryClient();

	// app context hook
	const { showToast } = useAppContext();

	const navigate = useNavigate();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	// react-query
	const mutation = useMutation(apiClient.register, {
		onSuccess: async () => {
			showToast({ message: "Registration Success", type: "SUCCESS" });
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
			<h2 className="text-3xl font-bold text-center mb-8">Create an Account</h2>

			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-gray-700 text-sm font-bold flex-1">
					First Name
					<input
						type="text"
						className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
						{...register("firstName", { required: "This field is required" })}
					/>
					{errors.firstName && <span className="text-red-500 text-xs pt-1">{errors.firstName.message}</span>}
				</label>

				<label className="text-gray-700 text-sm font-bold flex-1">
					Last Name
					<input
						type="text"
						className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
						{...register("lastName", { required: "This field is required" })}
					/>
					{errors.lastName && <span className="text-red-500 text-xs pt-1">{errors.lastName.message}</span>}
				</label>
			</div>

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

			<label className="text-gray-700 text-sm font-bold flex-1">
				Confirm Password
				<input
					type="password"
					className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
					{...register("confirmPassword", {
						validate: (val) => {
							if (!val) {
								return "This field is required";
							} else if (watch("password") !== val) {
								return "Your passwords do not match";
							}
						},
					})}
				/>
				{errors.confirmPassword && <span className="text-red-500 text-xs pt-1">{errors.confirmPassword.message}</span>}
			</label>

			<span>
				<button
					type="submit"
					className="bg-blue-600 rounded-sm text-white p-2 font-bold hover:bg-blue-500 text-lg">
					Create Account
				</button>
			</span>
		</form>
	);
};

export default Register;
