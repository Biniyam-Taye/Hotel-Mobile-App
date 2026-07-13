class DummyFoodData {
  static final List<Map<String, dynamic>> menu = [
    {
      'id': 'food_1',
      'title': 'Avocado Toast',
      'description': 'Sourdough bread, smashed avocado, poached egg, chili flakes.',
      'price': 18.0,
      'category': 'Breakfast',
      'imageUrl': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
      'prepTime': '15 min',
      'calories': 450,
      'isPopular': true,
    },
    {
      'id': 'food_2',
      'title': 'Grilled Salmon',
      'description': 'Fresh Atlantic salmon, asparagus, quinoa, lemon herb butter.',
      'price': 34.0,
      'category': 'Dinner',
      'imageUrl': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
      'prepTime': '25 min',
      'calories': 620,
      'isPopular': true,
    },
    {
      'id': 'food_3',
      'title': 'Wagyu Beef Burger',
      'description': 'Premium wagyu beef, caramelized onions, truffle mayo, brioche bun.',
      'price': 28.0,
      'category': 'Lunch',
      'imageUrl': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
      'prepTime': '20 min',
      'calories': 850,
      'isPopular': false,
    },
    {
      'id': 'food_4',
      'title': 'Matcha Latte',
      'description': 'Premium grade matcha, almond milk, honey.',
      'price': 8.0,
      'category': 'Drinks',
      'imageUrl': 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=800',
      'prepTime': '5 min',
      'calories': 120,
      'isPopular': false,
    },
  ];

  static Map<String, dynamic>? getFoodById(String id) {
    try {
      return menu.firstWhere((food) => food['id'] == id);
    } catch (_) {
      return null;
    }
  }
}
