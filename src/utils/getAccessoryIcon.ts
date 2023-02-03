
export function getAccessoryIcon(type: string) {
    switch(type) {
        case 'speed':
            return 'arrow-up';
        case 'acceleration':
            return 'arrow-up';
        case 'turning_diameter':
            return 'arrow-up-circle';
        case 'gasoline_motor':
            return 'droplet';
        case 'electric_motor':
            return 'car-electric';
        case 'hybrid_motor':
            return 'arrow-up';
        case 'exchange':
            return 'arrow-up';
        case 'seats':
            return 'user';
        default:
            return 'car';
    }
}