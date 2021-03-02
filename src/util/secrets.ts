export const JWT_SECRET = process.env.JWT_SECRET ?? ''

if (!process.env.JWT_SECRET) {
    console.log('No JWT secret string. Set JWT_SECRET environment variable.');
    process.exit(1);
}