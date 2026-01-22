type ServiceResponse<T> = {
	success: boolean;
	data?: T;
	error?: string;
};

export default ServiceResponse;
