export const mockOffers = [
  {
    id: 'o1',
    title: 'Early Bird Special',
    subtitle: 'Sun, sea, and savings on your perfect coastal getaway',
    description: 'Plan ahead and save big! Enjoy 25% off on all room types when you book at least 30 days before your stay. Whether you are planning a family vacation or a solo recharge, this package layers premium perks onto an already exceptional stay.',
    discountTag: '25% OFF',
    typeTag: 'Seasonal',
    validUntil: '2026-08-31',
    packagePricing: 'ETB 240',
    stayLength: '3+ nights',
    guests: 'Up to 4',
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    detailImages: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80'
    ],
    highlights: [
      { id: 'h1', title: '4th Night Free', description: 'Stay 3 nights, get the 4th complimentary at select beachfront hotels.' },
      { id: 'h2', title: 'Daily Breakfast', description: 'Full buffet or a la carte breakfast for all registered guests.' },
      { id: 'h3', title: 'Late Checkout', description: 'Enjoy until 2 PM on your departure day - subject to availability.' },
      { id: 'h4', title: 'Resort Credit', description: '$50 daily credit toward spa, dining, or activities.' }
    ],
    status: 'Active'
  },
  {
    id: 'o2',
    title: 'Romantic Getaway',
    subtitle: 'Perfect for Couples',
    description: 'Includes champagne on arrival, rose petal turndown, couples spa treatment, and a candlelit dinner.',
    discountTag: '15% OFF',
    typeTag: 'Couples',
    validUntil: '2026-02-28',
    packagePricing: 'ETB 350',
    stayLength: '2+ nights',
    guests: '2 Adults',
    mainImage: 'https://images.unsplash.com/photo-1517445963287-20ff67d3077e?auto=format&fit=crop&w=800&q=80',
    detailImages: [],
    highlights: [
      { id: 'h1', title: 'Welcome Champagne', description: 'A chilled bottle of premium champagne waiting in your room.' },
      { id: 'h2', title: 'Couples Massage', description: '60-minute relaxing massage for two at our luxury spa.' }
    ],
    status: 'Active'
  },
  {
    id: 'o3',
    title: 'Family Fun Package',
    subtitle: 'Great for Families',
    description: 'Includes connecting rooms, complimentary kids meals, free airport transfers, and a family excursion.',
    discountTag: '20% OFF',
    typeTag: '+ POPULAR',
    validUntil: '2026-08-31',
    packagePricing: 'ETB 450',
    stayLength: '4+ nights',
    guests: 'Up to 5',
    mainImage: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
    detailImages: [],
    highlights: [
      { id: 'h1', title: 'Kids Eat Free', description: 'Children under 12 eat free from the kids menu.' }
    ],
    status: 'Active'
  }
];
