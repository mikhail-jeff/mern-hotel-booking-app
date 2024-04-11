import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";

type ToastMessage = {
	message: string;
	type: "SUCCESS" | "ERROR";
};

type AppContext = {
	showToast: (toastMessage: ToastMessage) => void;
	isLoggedIn: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
const AppContext = createContext<AppContext | undefined>(undefined);

type AppContextProviderProps = {
	children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
	const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

	const { isError } = useQuery("validateToken", apiClient.validateToken, {
		retry: false,
	});

	return (
		<AppContext.Provider
			value={{
				showToast: (toastMessage) => {
					setToast(toastMessage);
				},
				isLoggedIn: !isError,
			}}>
			{/* toast component */}
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(undefined)}
				/>
			)}

			{children}
		</AppContext.Provider>
	);
};

// app context hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
	const context = useContext(AppContext);

	return context as AppContext;
};
