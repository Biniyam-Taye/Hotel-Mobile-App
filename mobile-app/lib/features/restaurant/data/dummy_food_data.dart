class DummyFoodData {
  static final List<Map<String, dynamic>> menu = [
    {
      'id': 'food_1',
      'title': 'Avocado Toast',
      'description':
          'Sourdough bread topped with smashed avocado, a perfectly poached egg, chili flakes, and micro greens. A wholesome start to the day.',
      'price': 18.0,
      'category': 'Breakfast',
      'imageUrl':
          'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
      'prepTime': '15 min',
      'calories': 450,
      'isPopular': true,
    },
    {
      'id': 'food_2',
      'title': 'Eggs Benedict',
      'description':
          'Classic poached eggs on toasted English muffins with Canadian bacon, blanketed in rich hollandaise sauce.',
      'price': 22.0,
      'category': 'Breakfast',
      'imageUrl':
          'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=800',
      'prepTime': '20 min',
      'calories': 620,
      'isPopular': false,
    },
    {
      'id': 'food_3',
      'title': 'Wagyu Beef Burger',
      'description':
          'Premium wagyu beef patty with caramelized onions, aged cheddar, truffle mayo, and brioche bun. Served with truffle fries.',
      'price': 28.0,
      'category': 'Lunch',
      'imageUrl':
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
      'prepTime': '20 min',
      'calories': 850,
      'isPopular': true,
    },
    {
      'id': 'food_4',
      'title': 'Caesar Salad',
      'description':
          'Crispy romaine lettuce, house-made Caesar dressing, shaved Parmesan, sourdough croutons, and anchovy crisps.',
      'price': 16.0,
      'category': 'Lunch',
      'imageUrl':
          'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=800',
      'prepTime': '10 min',
      'calories': 380,
      'isPopular': false,
    },
    {
      'id': 'food_5',
      'title': 'Grilled Salmon',
      'description':
          'Fresh Atlantic salmon fillet, tender asparagus, fluffy quinoa, and a lemon herb butter sauce. Light, clean, and full of flavor.',
      'price': 34.0,
      'category': 'Dinner',
      'imageUrl':
          'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
      'prepTime': '25 min',
      'calories': 520,
      'isPopular': true,
    },
    {
      'id': 'food_6',
      'title': 'Beef Tenderloin',
      'description':
          'Prime cut beef tenderloin cooked to perfection, served with truffle mashed potato, sautéed baby spinach, and a red wine reduction.',
      'price': 58.0,
      'category': 'Dinner',
      'imageUrl':
          'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
      'prepTime': '35 min',
      'calories': 720,
      'isPopular': true,
    },
    {
      'id': 'food_7',
      'title': 'Matcha Latte',
      'description':
          'Premium ceremonial-grade matcha whisked with steamed almond milk and a touch of honey. A calm, earthy start.',
      'price': 8.0,
      'category': 'Drinks',
      'imageUrl':
          'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=800',
      'prepTime': '5 min',
      'calories': 120,
      'isPopular': false,
    },
    {
      'id': 'food_8',
      'title': 'Fresh Mango Mojito',
      'description':
          'Muddled fresh mint, ripe mango puree, zesty lime, and sparkling water. A refreshing and vibrant non-alcoholic cocktail.',
      'price': 10.0,
      'category': 'Drinks',
      'imageUrl':
          'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=800',
      'prepTime': '5 min',
      'calories': 90,
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
