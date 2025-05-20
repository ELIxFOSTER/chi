module.exports = [
  {
    name: "The Study Hub",
    description: "A modern coworking space perfect for deep work and study sessions. Features private rooms and open spaces.",
    address: {
      street: "123 Tech Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    },
    type: "coworking",
    amenities: {
      wifi: true,
      powerOutlets: true,
      quiet: true,
      food: true,
      coffee: true,
      parking: true,
      wheelchairAccessible: true,
      hours24: false
    },
    operatingHours: {
      monday: { open: "08:00", close: "22:00", isOpen: true },
      tuesday: { open: "08:00", close: "22:00", isOpen: true },
      wednesday: { open: "08:00", close: "22:00", isOpen: true },
      thursday: { open: "08:00", close: "22:00", isOpen: true },
      friday: { open: "08:00", close: "22:00", isOpen: true },
      saturday: { open: "10:00", close: "20:00", isOpen: true },
      sunday: { open: "10:00", close: "20:00", isOpen: true }
    },
    photos: [
      "https://example.com/study-hub-1.jpg",
      "https://example.com/study-hub-2.jpg"
    ],
    rating: 4.5,
    reviews: [],
    noiseLevel: "quiet",
    capacity: 50,
    priceRange: "$$",
    ownerId: "system",
    isVerified: true
  },
  {
    name: "Coffee & Code",
    description: "A cozy cafe with dedicated study areas and high-speed internet. Known for their specialty coffee.",
    address: {
      street: "456 Java Lane",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      coordinates: {
        latitude: 37.7833,
        longitude: -122.4167
      }
    },
    type: "cafe",
    amenities: {
      wifi: true,
      powerOutlets: true,
      quiet: false,
      food: true,
      coffee: true,
      parking: false,
      wheelchairAccessible: true,
      hours24: false
    },
    operatingHours: {
      monday: { open: "07:00", close: "21:00", isOpen: true },
      tuesday: { open: "07:00", close: "21:00", isOpen: true },
      wednesday: { open: "07:00", close: "21:00", isOpen: true },
      thursday: { open: "07:00", close: "21:00", isOpen: true },
      friday: { open: "07:00", close: "22:00", isOpen: true },
      saturday: { open: "08:00", close: "22:00", isOpen: true },
      sunday: { open: "08:00", close: "20:00", isOpen: true }
    },
    photos: [
      "https://example.com/coffee-code-1.jpg",
      "https://example.com/coffee-code-2.jpg"
    ],
    rating: 4.2,
    reviews: [],
    noiseLevel: "moderate",
    capacity: 30,
    priceRange: "$",
    ownerId: "system",
    isVerified: true
  },
  {
    name: "Public Library Study Center",
    description: "A quiet public library with dedicated study rooms and free resources.",
    address: {
      street: "789 Book Avenue",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      coordinates: {
        latitude: 37.7793,
        longitude: -122.4192
      }
    },
    type: "library",
    amenities: {
      wifi: true,
      powerOutlets: true,
      quiet: true,
      food: false,
      coffee: false,
      parking: true,
      wheelchairAccessible: true,
      hours24: false
    },
    operatingHours: {
      monday: { open: "10:00", close: "18:00", isOpen: true },
      tuesday: { open: "10:00", close: "18:00", isOpen: true },
      wednesday: { open: "10:00", close: "18:00", isOpen: true },
      thursday: { open: "10:00", close: "18:00", isOpen: true },
      friday: { open: "10:00", close: "18:00", isOpen: true },
      saturday: { open: "10:00", close: "17:00", isOpen: true },
      sunday: { open: "12:00", close: "17:00", isOpen: true }
    },
    photos: [
      "https://example.com/library-1.jpg",
      "https://example.com/library-2.jpg"
    ],
    rating: 4.7,
    reviews: [],
    noiseLevel: "quiet",
    capacity: 100,
    priceRange: "$",
    ownerId: "system",
    isVerified: true
  }
]; 