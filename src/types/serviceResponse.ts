type ServiceResponse<T> = {
	success: boolean;
	data?: T;
	error?: string;
	statusCode: number;
};

export default ServiceResponse;
