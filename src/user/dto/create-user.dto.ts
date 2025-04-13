

export class CreateUserDto {
    name: string; // Name of the user
    email: string; // Email of the user
    phone: string; // Phone number of the user
    address: string; // Address of the user
    password: string; // Password of the user
    role: string; // Role of the user (e.g., admin, user)
    isActive: boolean; // Status of the user (active or inactive)
}
