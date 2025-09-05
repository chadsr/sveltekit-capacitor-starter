/**
 * ClientError represents a "safe" to display error, thrown during client-side page load
 */
export class ClientError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
        this.name = 'ClientError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
