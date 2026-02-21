require('dotenv').config();
const mongoose = require('mongoose');
const Expert = require('../src/models/Expert');

const seedExperts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for seeding');

        await Expert.deleteMany({});
        console.log('Cleared existing experts');

        try {
            await mongoose.connection.collection('bookings').drop();
            console.log('Cleared existing bookings and indexes');
        } catch (e) {
            // Collection might not exist yet
        }

        const expertsData = [
            {
                name: 'Dr. John Doe', category: 'Medical', experience: 10, rating: 4.8, bio: 'Expert in general medicine.',
                imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
                availability: { days: [1, 2, 3, 4, 5], startHour: 8, endHour: 16 } // Mon-Fri, 8am-4pm
            },
            {
                name: 'Jane Smith', category: 'Legal', experience: 8, rating: 4.5, bio: 'Corporate lawyer with 8 years of experience.',
                imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
                availability: { days: [1, 3, 5], startHour: 9, endHour: 17 } // Mon, Wed, Fri, 9am-5pm
            },
            {
                name: 'Alice Johnson', category: 'Tech', experience: 5, rating: 4.9, bio: 'Senior software engineer at Google.',
                imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
                availability: { days: [0, 6], startHour: 10, endHour: 14 } // Sun, Sat, 10am-2pm
            },
            {
                name: 'Bob Williams', category: 'Finance', experience: 12, rating: 4.7, bio: 'Certified financial planner.',
                imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop',
                availability: { days: [2, 4], startHour: 8, endHour: 12 } // Tue, Thu, 8am-12pm
            },
            {
                name: 'Charlie Brown', category: 'Education', experience: 6, rating: 4.6, bio: 'Experienced math tutor.',
                imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop',
                availability: { days: [1, 2, 3, 4, 5], startHour: 15, endHour: 20 } // Mon-Fri, 3pm-8pm
            },
            {
                name: 'Diana Clark', category: 'Tech', experience: 7, rating: 4.8, bio: 'Cloud architect specializing in AWS.',
                imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                availability: { days: [1, 2, 3, 4, 5, 6], startHour: 7, endHour: 15 } // Mon-Sat, 7am-3pm
            },
            {
                name: 'Ethan Davis', category: 'Medical', experience: 15, rating: 4.9, bio: 'Renowned cardiologist.',
                imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
                availability: { days: [1, 4, 5], startHour: 8, endHour: 12 } // Mon, Thu, Fri, 8am-12pm
            },
            {
                name: 'Fiona Evans', category: 'Legal', experience: 9, rating: 4.4, bio: 'Family law attorney.',
                imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
                availability: { days: [2, 3, 4], startHour: 13, endHour: 18 } // Tue, Wed, Thu, 1pm-6pm
            },
            {
                name: 'George Foster', category: 'Finance', experience: 11, rating: 4.7, bio: 'Investment banker.',
                imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
                availability: { days: [1, 2, 3, 4, 5], startHour: 9, endHour: 18 } // Mon-Fri, 9am-6pm
            },
            {
                name: 'Hannah Green', category: 'Education', experience: 4, rating: 4.5, bio: 'English literature teacher.',
                imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
                availability: { days: [0, 1, 2, 3, 4, 5, 6], startHour: 10, endHour: 16 } // Mon-Sun, 10am-4pm
            }
        ];

        await Expert.insertMany(expertsData);
        console.log('Seeded 10 experts successfully!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedExperts();
