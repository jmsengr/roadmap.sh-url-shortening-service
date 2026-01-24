type ServiceResponse<T> =
  | { type: 'create' | 'read' | 'update' | 'delete'; data: T }      // Operation succeeded
  | { type: 'failure'; error: string }; // Operation failed

export default ServiceResponse;

