import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sweets = [
    // Macarons
    {
        name: 'Rainbow Macarons',
        category: 'Macarons',
        price: 950.00,
        quantity: 50,
        imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
        description: 'Assorted box of 12 premium French macarons in various flavors like pistachio, raspberry, and lemon.',
    },
    {
        name: 'Rose & Lychee Macarons',
        category: 'Macarons',
        price: 1150.00,
        quantity: 35,
        imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
        description: 'Delicate floral notes of rose paired with sweet lychee cream.',
    },

    // Cupcakes
    {
        name: 'Velvet Cupcakes',
        category: 'Cupcakes',
        price: 350.00,
        quantity: 45,
        imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
        description: 'Rich red velvet cupcakes topped with cream cheese frosting and sprinkles.',
    },
    {
        name: 'Lemon Meringue Cupcake',
        category: 'Cupcakes',
        price: 320.00,
        quantity: 30,
        imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
        description: 'Zesty lemon cupcake topped with fluffy toasted meringue.',
    },

    // Chocolates
    {
        name: 'Dark Chocolate Truffles',
        category: 'Chocolates',
        price: 1250.00,
        quantity: 25,
        imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
        description: 'Hand-dipped artisan dark chocolate truffles with a smooth ganache center.',
    },
    {
        name: 'Sea Salt Caramels',
        category: 'Chocolates',
        price: 1050.00,
        quantity: 40,
        imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=800&q=80',
        description: 'Chewy caramel bites covered in milk chocolate with a sprinkle of sea salt.',
    },

    // Donuts
    {
        name: 'Glazed Donuts Trio',
        category: 'Donuts',
        price: 399.00,
        quantity: 30,
        imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
        description: 'Classic glazed donuts, fluffy and fresh from the oven.',
    },
    {
        name: 'Berry Blast Donut',
        category: 'Donuts',
        price: 250.00,
        quantity: 50,
        imageUrl: 'https://images.unsplash.com/photo-1626094309830-2b9ed434ad6e?auto=format&fit=crop&w=800&q=80',
        description: 'Filled with blueberry jam and topped with strawberry glaze.',
    },

    // Cakes
    {
        name: 'New York Cheesecake',
        category: 'Cakes',
        price: 650.00,
        quantity: 15,
        imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
        description: 'Classic creamy New York style cheesecake with a graham cracker crust.',
    },
    {
        name: 'Tiramisu Slice',
        category: 'Cakes',
        price: 750.00,
        quantity: 12,
        imageUrl: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80',
        description: 'Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.',
    },
    {
        name: 'Black Forest Cake',
        category: 'Cakes',
        price: 550.00,
        quantity: 10,
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=800&q=80',
        description: 'Layers of chocolate sponge, whipped cream, and cherries.',
    },

    // Cookies
    {
        name: 'Choco Chip Cookies',
        category: 'Cookies',
        price: 150.00,
        quantity: 100,
        imageUrl: 'https://images.unsplash.com/photo-1499636138143-bd630f5cf386?auto=format&fit=crop&w=800&q=80',
        description: 'Crispy edges and chewy centers, loaded with semi-sweet chocolate chips.',
    },
    {
        name: 'Oatmeal Raisin',
        category: 'Cookies',
        price: 120.00,
        quantity: 60,
        imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
        description: 'Soft and chewy oatmeal cookies with plump raisins and cinnamon.',
    },

    // Ice Cream
    {
        name: 'Strawberry Ice Cream',
        category: 'Ice Cream',
        price: 350.00,
        quantity: 20,
        imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80',
        description: 'Fresh strawberry ice cream made with real fruit and organic milk.',
    },
    {
        name: 'Mint Choco Chip',
        category: 'Ice Cream',
        price: 350.00,
        quantity: 18,
        imageUrl: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d1?auto=format&fit=crop&w=800&q=80',
        description: 'Refreshing mint ice cream with dark chocolate chips.',
    },

    // Candy
    {
        name: 'Gummy Bears Mix',
        category: 'Candy',
        price: 150.00,
        quantity: 200,
        imageUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=800&q=80',
        description: 'A colorful mix of fruity gummy bears.',
    },
    {
        name: 'Sour Worms',
        category: 'Candy',
        price: 150.00,
        quantity: 150,
        imageUrl: 'https://images.unsplash.com/photo-1533230620864-4e2a6d45903e?auto=format&fit=crop&w=800&q=80',
        description: 'Tangy and sweet sour worms in neon colors.',
    },

    // Artisan
    {
        name: 'Matcha KitKat (Artisan)',
        category: 'Artisan',
        price: 450.00,
        quantity: 40,
        imageUrl: 'https://images.unsplash.com/photo-1481391319762-47d9306953e1?auto=format&fit=crop&w=800&q=80', // General sweet image
        description: 'Premium matcha green tea flavored chocolate wafer bars.',
    }
];

async function main() {
    console.log('Start seeding ...');
    // Clear existing sweets to ensure a clean slate
    try {
        await prisma.sweet.deleteMany({});
    } catch (e) {
        console.log('Database might be empty, continuing...');
    }

    for (const sweet of sweets) {
        const s = await prisma.sweet.create({
            data: sweet,
        });
        console.log(`Created sweet: ${s.name} - ₹${s.price}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
