const recipes = [
  {
    author: 'Unknown',
    url: '#',
    isBasedOn: '',
    cookTime: '30 Min',
    datePublished: '2016-10-16',
    tags: ['Waffles', 'Sweet Potato', 'Side', 'Dessert'],
    description: 'Savory waffles made with Sweet potato with a hint of Ginger',
    image: './images/sweet-potato-waffle-md.webp',
    recipeIngredient: [
      '2 separated eggs',
      '1/4 C Oil',
      '1/4 tsp salt',
      '1/4 tsp Cayenne pepper',
      '3/4 C milk',
      '1 Tbsp Brown Sugar',
      '2 tsp Shredded Ginger',
      '3/4 C Mashed Sweet Potatoes',
      '1 Tbsp Minced Shallots',
      '1 Tbsp Baking Powder',
      '1 Tbsp Chives',
      '1/4 C Cornmeal',
      '1 C Flour'
    ],
    dressingIngredient: [],
    name: 'Sweet Potato Waffles',
    prepTime: '30 Min',
    recipeInstructions: [
      'Add the egg yolks, oil, salt, cayenne, sugar, ginger, shallots, sweet potatoes (steam and mash before), and milk and mix well.',
      'Next add the cornmeal, chives, and flour and baking powder',
      'Whip the egg whites until stiff and fold in',
      'Cook until golden brown in a waffle iron. Serve with butter and Wilted Greens or Honey.'
    ],
    recipeYield: '6 waffles',
    rating: 4
  },
  // {
  //   author: 'Unknown',
  //   url: '#',
  //   isBasedOn: '',
  //   cookTime: '20 min',
  //   datePublished: '',
  //   tags: ['Chicken', 'Entree'],
  //   description:
  //     'Delicious quick and easy creamy rice dish. The mustard, mushrooms, and lemon all blend together wonderfully',
  //   image: './images/escalopes-de-poulet-a-la-creme.webp',
  //   recipeIngredient: [
  //     '2 Chicken Tenders, Cubed',
  //     '4 Mushrooms, Sliced',
  //     '1/2 C Whipping Cream',
  //     '1-2 Tbsp Stone Ground Mustard',
  //     '1 tsp Lemon Juice',
  //     'Salt and Pepper to taste',
  //     '1 C Rice, uncooked',
  //     '4-5 oz Fresh Green Beans'
  //   ],
  //   dressingIngredient: [],
  //   name: 'Escalope de Poulet a la Creme with steamed green beans (Chicken with Cream)',
  //   prepTime: '10 min',
  //   recipeInstructions: [
  //     'Add 1 1/2 cups of water to a pan and bring to a boil.  Add the rice and reduce heat to low and simmer for 10-15 minutes or until all the moisture is gone.',
  //     'Cube chicken then cook over medium high heat in a fry pan, add the mushrooms about halfway through. (10 minutes). ',
  //     'Pour in cream, mustard and salt and pepper.  Stir.  On medium heat, simmer until it thickens (5 minutes)',
  //     'While preparing sauce: wash the beans, then trim the ends and snap (or cut) into 2in lengths.  In a sauce pan with a colander add about 1 cup water and steam the beans (10-15 minutes)',
  //     'Serve sauce over rice, with the Green beans on the side.'
  //   ],
  //   recipeYield: '3 servings',
  //   rating: 4.5
  // },
  {
    author: 'Unknown',
    url: '#',
    isBasedOn: '',
    cookTime: '30 min',
    datePublished: '2018-09-19',
    tags: ['Potatoes', 'Side'],
    description:
      'Easy and delicious oven roasted potatoes that go great with almost anything.',
    image: './images/roasted-potatoes.webp',
    recipeIngredient: [
      '3-4 Medium Potatoes',
      '1 Tbsp Olive oil',
      '2 tsp Italian Seasoning',
      '1/2 tsp Salt',
      '1/2 tsp Ground Black Pepper',
      '1-2 tsp Hot Sauce (optional)'
    ],
    dressingIngredient: [],
    name: 'Oven Roasted potato slices',
    prepTime: '10 min',
    recipeInstructions: [
      'Preheat oven to 400 deg F',
      'Wash and thinly slice the potatoes (I usually slice the potato in half lengthwise, then thinly slice the halves, again lengthwise)',
      'Mix together the oil, salt, pepper, Italian seasoning, and hot sauce.',
      'Toss the potatoes in the spice mixture to evenly coat then spead over a baking sheet',
      'Bake for 30 min or until the desired level of crispyness is achieved.'
    ],
    recipeYield: '',
    rating: 4
  },
  {
    author: 'Unknown',
    url: '#',
    isBasedOn: '',
    cookTime: '20 min',
    datePublished: '2018-09-19',
    tags: ['Southwest', 'Entree'],
    description:
      'Black beans and tomatoes served over a bed of rice. Top with cheese and scoop up with tortilla chips for maximum enjoyment.',
    image: './images/black-beans-and-rice.webp',
    recipeIngredient: [
      '1 Medium Onion, diced',
      '2 Cloves Garlic, minced',
      '1 Tbsp Olive oil',
      '1 Can Black Beans (15oz)',
      '1 Can Diced Tomatoes (15oz)',
      '1/8 tsp Cayenne Pepper (optional)',
      '2 C Brown Rice (uncooked)',
      'Grated Cheese',
      'Tortilla Chips'
    ],
    dressingIngredient: [],
    name: 'Black Beans and Rice',
    prepTime: '10 min',
    recipeInstructions: [
      'Add 4 cups water to a saucepan and bring to a boil. Add Rice, stir, cover, and reduce heat to low. Cook until moisture is gone. (20-30 minutes)',
      'In another saucepan heat the oil and add the diced onion and garlic. Cook until tender.',
      'Stir in the drained Black beans, Undrained tomatoes, and Cayenne.',
      'Bring to a boil, then reduce heat and simmer uncovered for 15 min.',
      'Serve over rice, topped with grated cheese and Tortilla chips.'
    ],
    recipeYield: '4 servings',
    rating: 3
  },
  // {
  //   author: 'Unknown',
  //   url: '#',
  //   isBasedOn: '',
  //   cookTime: '30 min',
  //   datePublished: '2018-09-19',
  //   tags: ['chicken', 'entree', 'Indian'],
  //   description:
  //     'Quick and easy Chicken curry recipe made with easy to find ingredients.',
  //   image: './images/chicken-curry.webp',
  //   recipeIngredient: [
  //     '4 Slices Bacon',
  //     '1 clove Garlic',
  //     '2 Tbsp Flour',
  //     '1 C water',
  //     '1 C Milk',
  //     '3 Tbsp Tomato Paste',
  //     '1/2 C Apple Sauce',
  //     '3-4 tsp Curry Powder',
  //     '2 tsp Chicken Bouillion',
  //     '3/4 C Sour Cream',
  //     '1-2 C Chicken, cubed',
  //     '2 C Rice, uncooked'
  //   ],
  //   dressingIngredient: [],
  //   name: 'Chicken Curry',
  //   prepTime: '10 min',
  //   recipeInstructions: [
  //     'Add 3 cups water to a saucepan and bring to a boil. Add Rice, stir, cover, and reduce heat to low. Cook until moisture is gone. (15-20 minutes)',
  //     'Cook bacon until crisp, drain reserving 1 Tbsp of bacon drippings, crumble bacon and set aside.',
  //     'Cook Chicken and Cube.',
  //     'Blend flour into bacon drippings then stir in the milk until the flour is well mixed. Stir in water, applesauce, tomato paste, curry, and bullion, and garlic.',
  //     'Bring to a boil, then reduce heat and simmer until rice is done.',
  //     'Before serving add crumbled bacon, chicken and stir in sour cream. Serve over rice.',
  //     'Can add condiments if desired: fried potatoes, raisins, toasted coconut, chutney, diced peppers, almonds, cashews.'
  //   ],
  //   recipeYield: '5 servings',
  //   rating: 5
  // },
  {
    author: 'Unknown',
    url: '#',
    isBasedOn: '',
    cookTime: '11 min',
    datePublished: '2018-09-19',
    tags: ['Dessert'],
    description: 'Delicious soft chocolate chip cookies with coconut.',
    image: './images/chocolate-chip-cookies.webp',
    recipeIngredient: [
      '1 Lb Butter, softened',
      '1 C White sugar',
      '3 Eggs',
      '1 1/2 C Brown sugar',
      '1 tsp Baking soda',
      '1 tsp Vanilla extract',
      '1/4 tsp Salt',
      '5 C Flour (We like mixing 2 cups whole wheat with 3 cups white)',
      '2 C Chocolate Chips',
      '1 C Shredded Coconut'
    ],
    dressingIngredient: [],
    name: 'Chocolate Chip Cookies',
    prepTime: '15 min',
    recipeInstructions: [
      'Preheat oven to 350F.',
      'Cream butter, white sugar, and eggs together.',
      'Add brown sugar, salt, baking soda, and vanilla. Mix well.',
      'Add flour, chocolate chips, and coconut. Mix well.',
      'Place on baking sheet in rows of 1-1.5 inch balls of dough.',
      'Bake for 11-12 minutes.'
    ],
    recipeYield: '8 dozen',
    rating: 5
  },
  {
    author: 'Unknown',
    url: '#',
    isBasedOn: '',
    cookTime: '45min',
    datePublished: '2023-10-10',
    tags: ['Dessert', 'German'],
    description:
      "This gooseberry cake with crumble is easy to follow, a bit tart and not too sweet. Made up of a cake base, filled with fresh gooseberries and vanilla cream and finished off with crumble that's flavored with vanilla. A must have recipe for gooseberry lovers!!",
    image: './images/german-gooseberry-cake.webp',
    recipeIngredient: [
      'For the Cake Base:',
      '180 g (1 ½ cups/ 6.3 oz) plain flour',
      '2 medium eggs',
      '100 g (3 ½ oz) butter soft',
      '2 teaspoons vanilla sugar',
      '60 g (about 1/3 cup/ 2.1 oz) sugar',
      '2 ½ teaspoons baking powder',
      'For the Vanilla Cream:',
      '250 ml (1 cup/ 8 ½ fl. oz) milk',
      '40 (⅓ cup/ 1.4 oz) corn flour cornstarch',
      '2 tablespoons sugar',
      '1 tablespoon vanilla sugar',
      '200 g (7.1 oz) sour cream',
      'For the struesel (crumble):',
      '250 g (2 cups + 1 tablespoon/ 8.8 oz) plain flour (all purpose flour)',
      '2 tablespoons vanilla sugar',
      '175 g (about ¾ cup/ 6.2 oz) butter soft',
      '100 g (½ cup/ 3 ½ oz) sugar',
      'You will also need:',
      '550 g (1.2 lbs) gooseberries washed and stems and brown appendage removed OR',
      '550 g (1.2 lbs) raspberries'
    ],
    dressingIngredient: [],
    name: 'Gooseberry cake with vanilla cream and crumble',
    prepTime: '30 min',
    recipeInstructions: [
      'Combine the flour, butter, sugar and eggs in a bowl and beat with a whisk until you have a smooth dough. Transfer the batter to a 26 cm(10 inch) spring-form (or cake tin with removable base) lined with a parchment paper at the bottom and greased on the side. Smooth with a spoon or spatula and set aside.',
      "In the same bowl that you've used to make the cake base combine sugar, butter and flour. Using your hands mix all the ingredients together until small crumbles start to form. Set aside as well. Then preheat the oven to 180 ° C (356 °F), with both top and bottom heat.",
      'Now in a small pot combine milk, sugar and cornstarch (corn flour). Keep stirring constantly until it starts to bubble and has thickened. Remove from the heat and let cool for 2 to 3 minutes. In the meantime scatter gooseberries over the base. Add sour cream to the cream that you previously made and whisk. Spread the vanilla cream on top of the gooseberries and sprinkle the crumble evenly over the top and bake for 45 minutes or until the crumbles are lightly golden brown. Remove from the oven and let cool for few minutes. Serve it with whipped cream and enjoy!'
    ],
    recipeYield: '12 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: '#',
    isBasedOn: '',
    cookTime: '45min',
    datePublished: '2023-10-10',
    tags: ['Dessert'],
    description:
      "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
    image: './images/apple-crisp.webp',
    recipeIngredient: [
      '10 C Apples, cored and sliced',
      '1 C White sugar',
      '1 Tbsp White flour',
      '1 tsp Ground cinnamon',
      '3 Tbsp Water',
      '1 C Rolled oats',
      '1 C Flour',
      '1 C Brown sugar',
      '1/4 tsp Baking powder',
      '1/4 tsp Baking soda',
      '1/2 C Butter, melted'
    ],
    dressingIngredient: [],
    name: 'Apple Crisp',
    prepTime: '30 min',
    recipeInstructions: [
      'Preheat the oven to 350 degrees F (175 degrees C).',
      'Place sliced apples in a 9x13-inch baking dish. Mix white sugar, 1 tablespoon flour, and cinnamon together; sprinkle over apples. Pour water evenly over apples.',
      'Combine oats, 1 cup flour, brown sugar, baking powder, and baking soda in a large bowl. Add melted butter and mix with a fork until crumbly; sprinkle evenly over apple mixture.',
      'Bake in the preheated oven until top is golden brown and apples are bubbling around the edges, about 45 minutes.'
    ],
    recipeYield: '12 servings',
    rating: 4
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'This healthy salad is perfect as all-season entree.',
    image: './images/salads/balsamic-tomato-mushroom-salad.jpeg',
    recipeIngredient: [
      '18 oz. carton mushrooms, peeled and sliced',
      '3 medium tomatoes, cubed or 2 cups grape tomatoes, halved',
      '2 scallions, chopped'
    ],
    dressingIngredient: [
      '2 tbsp. Olive oil',
      '3 tbsp. Balsamic vinegar',
      '2-3 tbsp. Sugar (or Allulosa & Monk Fruit',
      '1/2 tsp. Salt',
      '1/4 tsp. Garlic',
      '1 tsp. Italian seasoning'
    ],
    name: 'Balsamic Tomato Mushroom Salad',
    prepTime: '20 min',
    recipeInstructions: [
      'Combine all salad ingredients and dress.',
      'Let stand for 30 minutes, mixing from time to time so that the mushrooms can soak up some of the flavor.'
    ],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'The perfect salad for those pasta lovers.',
    image: './images/salads/basil-angel-hair-salad.jpeg',
    recipeIngredient: [
      '1 box angel hair pasta (or any pasta of your choice), cooked according to package instructions.'
    ],
    dressingIngredient: [
      '1/3 cup Oil',
      '6 cubes Frozen basil',
      '1/2 tsp. Garlic powder',
      '1/2 tsp. Onion powder',
      'Salt',
      'Pepper'
    ],
    name: 'Basil Angel Hair Salad',
    prepTime: '20 min',
    recipeInstructions: ['Combine all salad ingredients and dress.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Do you like spinachs? Then, this is your salad.',
    image: './images/salads/arugula-beet-salad.png',
    recipeIngredient: ['1 bag arugula', '2 cooked beets, cubed', 'Pine nuts'],
    dressingIngredient: [
      '1/2 cup mayonnaise',
      '1/4 cup vinegar',
      '1 tbsp. truffle oil',
      'salt and pepper'
    ],
    name: 'Arugula Beet Salad',
    prepTime: '20 min',
    recipeInstructions: ['Combine all salad ingredients and dress.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Another spinach salad star.',
    image: './images/salads/spinach-mushroom-salad.png',
    recipeIngredient: [
      'Spinach/Lettuce',
      '1 box mushrooms, sliced',
      '1 red pepper, diced',
      '2-3 scallions, chopped'
    ],
    dressingIngredient: [
      '1/2 cup oil',
      '4 Tbsp. sugar',
      '4 Tbsp. red wine vinegar',
      '2 Tbsp. parsley',
      '1-2 tsp. soy sauce'
    ],
    name: 'Spinach Mushroom Salad',
    prepTime: '20 min',
    recipeInstructions: ['Combine all salad ingredients and dress.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'A bit of Mediterranean legacy.',
    image: './images/salads/balsamic-mediterranean-salad.png',
    recipeIngredient: [
      '1 can of chickpeas',
      'avocados, chopped finely',
      'tomatoes, chopped finely',
      'colorful peppers, chopped finely',
      'purple onion, chopped finely',
      'fresh parsley, chopped finely'
    ],
    dressingIngredient: [
      '1/2 cup oil',
      '1/3 cup lemon juice',
      '1/4 cup balsamic vinegar',
      '1 Tbs. oregano',
      '1 Tbs. cumin',
      '1 tsp. sea salt'
    ],
    name: 'Balsamic Mediterranean Salad',
    prepTime: '20 min',
    recipeInstructions: ['Combine all salad ingredients and dress.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Simple and delicious.',
    image: './images/salads/hearts-of-palm-salad.png',
    recipeIngredient: [
      '1 can of chickpeas',
      '1 can hearts of palm, sliced',
      '1 avocado, diced',
      '3 tomatoes, diced'
    ],
    dressingIngredient: [
      '1 Tbsp. mayonnaise',
      '1 Tbsp. lemon juice',
      'Garlic powder',
      'Salt, to taste'
    ],
    name: 'Hearts of Palm Salad',
    prepTime: '20 min',
    recipeInstructions: ['Combine all salad ingredients and dress.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Surprise, surprise!',
    image: './images/salads/roasted-corn-salad.png',
    recipeIngredient: [
      'Spring Mix',
      '1 can corn, roasted',
      'grape tomatoes, halved',
      'red onion, chopped',
      'candied pecan, crushed',
      'pastrami, sliced (optional)'
    ],
    dressingIngredient: [
      '1/4 cup oil',
      '1/4 cup dijon mustard',
      '3 Tbsp vinegar',
      '3 Tbsp. maple syrup',
      'salt and pepper'
    ],
    name: 'Roasted Corn Salad',
    prepTime: '20 min',
    recipeInstructions: ['Combine all salad ingredients and dress.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Surprise, surprise!',
    image: './images/salads/sesame-noodle-salad.png',
    recipeIngredient: [
      '1 box angel hair pasta or spaghetti, cooked according to package directions',
      '1/2 bunch scallions sliced',
      'sesame seeds'
    ],
    dressingIngredient: [
      '1/2 cup olive oil',
      '1/3 cup soy sauce',
      '1/4 cup sugar',
      '1 clove garlic, crushed',
      '1 tsp. ginger'
    ],
    name: 'Sesame Noodle Salad',
    prepTime: '20 min',
    recipeInstructions: [
      'Slice scallions and add to pasta. Pour on dressing. Sprinkle with sesame seeds.'
    ],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Another surprise for corn lovers!',
    image: './images/salads/corn-salad.png',
    recipeIngredient: [
      '3 corn on the cob, boiled/grilled',
      '1 can hearts of palm, sliced',
      '1 pt. grape tomatoes, sliced',
      'Avocado, cubed',
      'Cilantro (optional)'
    ],
    dressingIngredient: ['1/3 cup oil', '1/4 cup lemon juice', 'salt & pepper'],
    name: 'Corn Salad',
    prepTime: '20 min',
    recipeInstructions: [
      'Using a sharp knife, slice down close to the core, separating corn into chunks.',
      'Add rest of ingredients.',
      'Mix dressing and pour over.'
    ],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad', 'Dressing'],
    description: 'Looking for the right dressing?',
    image: './images/salads/balsamic-fig-vinaigrette.png',
    recipeIngredient: [],
    dressingIngredient: [
      '1/2 cup olive oil',
      '1/4 cup balsamic vinegar',
      '1/4 cup fig jam',
      '1 Tbsp silan',
      '2 tsp spicy brown mustard',
      '1 small shallot, finely minced',
      'salt and pepper'
    ],
    name: 'Balsamic Fig Vinaigrette',
    prepTime: '20 min',
    recipeInstructions: ['Mix thoroughly.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Mango & strawberry fan?',
    image: './images/salads/strawberry-mango-salad.png',
    recipeIngredient: [
      'Romaine lettuce or Spinach',
      '2 mangos, peeled and cubed',
      '1 pint strawberries, sliced',
      '1 cup honey roasted almonds',
      'Handful of Craisins'
    ],
    dressingIngredient: [
      '1/3 cup olive oil',
      '1/4 cup balsamic vinegar',
      '1/4 cup sugar',
      '1 Tbsp. parsley'
    ],
    name: 'Strawberry Mango Salad',
    prepTime: '20 min',
    recipeInstructions: ['Mix dressing and pour over salad.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'For the traditional taster.',
    image: './images/salads/caesar-salad.png',
    recipeIngredient: [
      'Romaine lettuce',
      'Paprika or garlic croutons',
      'Grape tomatoes/sun dried tomatoes'
    ],
    dressingIngredient: [
      '1/2 cup oil',
      '3 Tbsp. mayo',
      '2 Tbsp. dried chives',
      '2 Tbsp. parsley flakes',
      '2 tsp. lemon juice',
      '1 tsp. dry mustard',
      '1 tsp. sugar',
      '2 cloves garlic, crushed'
    ],
    name: 'Caesar Salad',
    prepTime: '20 min',
    recipeInstructions: [
      'Blend dressing and pour over salad.',
      'Sprinkle croutons on right before serving.'
    ],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad', 'Dressing'],
    description: 'Awesome dressing!',
    image: './images/salads/zesty-tahini-dressing.png',
    recipeIngredient: [],
    dressingIngredient: [
      '1/4 cup tahini',
      '1/4 cup apple cider vinegar',
      '1/4 cup lemon juice',
      '1/4 cup soy sauce, or coconut aminos',
      '1/2 cup nutritional yeast',
      '1 Tablespoon minced garlic'
    ],
    name: 'Zesty Tahini Dressing',
    prepTime: '20 min',
    recipeInstructions: ['Mix thoroughly.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Mediterranean flavor at its best!',
    image: './images/salads/mediterranean-chickpea-salad.png',
    recipeIngredient: [
      '2 cans of chickpeas',
      'grape tomatoes, halved',
      '3 scallions, sliced',
      'fresh cilantro, chopped'
    ],
    dressingIngredient: [
      '1/3 cup olive oil',
      '1/4 cup lemon juice',
      '1/2 tsp. garlic powder',
      '1/2 tsp. cumin',
      'salt and pepper'
    ],
    name: 'Mediterranean Chickpea Salad',
    prepTime: '20 min',
    recipeInstructions: ['Mix dressing and pour over salad.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Mediterranean flavor at its best!',
    image: './images/salads/roasted-pepper-spinach-salad.png',
    recipeIngredient: [
      'Spinach',
      'Red, yellow and orange peppers',
      'Portobello mushrooms',
      'Purple onion sliced in rings (optional)'
    ],
    dressingIngredient: [
      '3/4 cup vinegar',
      '1/4 cup sugar',
      '1/2 cup oil',
      '2 cloves garlic'
    ],
    name: 'Roasted Pepper Spinach Salad',
    prepTime: '20 min',
    recipeInstructions: [
      'Slice pepper and mushrooms.',
      'Roast in oven till soft.',
      'Cool vegetables.',
      'Place roasted vegetables over spinach.'
    ],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-11',
    tags: ['Salad'],
    description: 'Simple and delicious',
    image: './images/salads/poppy-seed-salad.png',
    recipeIngredient: [
      'Romaine Lettuce',
      '1 avocado, cubed',
      '1/2 purple onion, diced',
      'Pomegranate seeds',
      'Mandarin oranges',
      'Candied almonds (optional)'
    ],
    dressingIngredient: [
      '3/4 cup olive oil',
      '1/3 cup red wine vinegar',
      '1/4 cup sugar',
      '1 tsp. dry mustard powder',
      '1 tsp. salt',
      '1 tsp. poppy seeds'
    ],
    name: 'Poppy Seed Salad',
    prepTime: '20 min',
    recipeInstructions: ['Combine all salad ingredients and dress.'],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Julio Rubio',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-15',
    tags: ['Salad'],
    description:
      'Simple and delicious, and of course full of Mediterranean flavor.',
    image: './images/salads/julio-salad.jpg',
    recipeIngredient: [
      '1 Romaine Lettuce',
      '2 containers of cherry tomatoes, halved.',
      '1 can of black olives.',
      'Kosher salt'
    ],
    dressingIngredient: [
      '2 oz. of apple cider vinegar',
      '2 oz. of extra virgin olive oil'
    ],
    name: "Julio's Salad",
    prepTime: '20 min',
    recipeInstructions: [
      'Wash and cut the lettuce into pieces (size to your taste).',
      'Wash and cut tomatoes in halves.',
      'Place tomatoes onto the bottom of the serving bowl.',
      'Add kosher salt to taste.',
      'Add the lettuce.',
      'Add the olives.',
      'Prepare the dessing by gently mixing the vinegar and oil.',
      'Add the dressing.',
      'Mix gently.'
    ],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-15',
    tags: ['Salad'],
    description: '',
    image:
      './images/salads/roasted-vegetable-salad-with-creamy-dairy-dressing.png',
    recipeIngredient: [
      '1 Sweet potato, diced',
      '1 Small eggplant, cubed, salted, rinsed, and dried',
      '12 oz. Baby bella mushrooms, sliced',
      '1 Red onion, sliced in thin rounds',
      'Salt, pepper, and garlic, to taste',
      '12-16 Ounces romaine lettuce',
      'Parmesan cheese, for sprinkling'
    ],
    dressingIngredient: [
      '1/4 Cup Light mayonnaise',
      '2 Tbsp. Vinegar',
      '1 Tbsp. Soy sauce',
      '1 1/2 Tbsp. Honey',
      '1 Tbsp. Mustard',
      '1 Clove garlic, crushed',
      '1/2 tsp. Salt',
      '2 1/2 Tbsp. grated Parmesan cheese'
    ],
    name: 'Roasted Vegetable Salad with Creamy Dairy Dressing',
    prepTime: '20 min',
    recipeInstructions: [
      'Preheat oven to 400 degrees Fahrenheit.',
      'Line two baking sheets with parchment paper and spray with nonstick cooking spray.',
      'Place the sweet potato and eggplant pieces on one baking sheet.',
      'Place mushroom and onion slices on the other baking sheet.',
      'Spray vegetables with cooking spray and sprinkle with salt, pepper, and garlic.',
      'Roast mushrooms and onions for 20 minutes.',
      'Roast sweet potato and eggplant for 30 minutes.',
      'Mix all dressing ingredients to combine.',
      'In a large bowl, toss the lettuce with the roasted vegetables.',
      'Add the dressing and toss again.',
      'Sprinkle with Parmesan cheese and serve.'
    ],
    recipeYield: '6 servings',
    rating: 5
  },
  {
    author: 'Unknown',
    url: 'Unknown',
    isBasedOn: '',
    cookTime: '20min',
    datePublished: '2026-02-15',
    tags: ['Salad'],
    description: '',
    image: './images/salads/purple-cabbage-salad.png',
    recipeIngredient: [
      '1 Bag purple cabbage',
      '3 Scallions, sliced',
      '1 Pkg. Ramen Noodles',
      'Sprinkle of cilantro  on top (optional)'
    ],
    dressingIngredient: [
      '--Dressing #1--',
      ' ',
      '8 Tbsp. Mayo',
      '1/2 cup Sugar',
      '3 Tbsp. Vinegar',
      '1-2 cloves Garlic, minced',
      'Salt and pepper',
      ' ',
      '--Dressing #2--',
      ' ',
      '1/3 cup Olive oil',
      '5 Tbsp. Vinegar',
      '1 tsp. Salt',
      'Dash of pepper'
    ],
    name: 'Purple Cabbage Salad',
    prepTime: '20 min',
    recipeInstructions: ['Mix ingredients and dress to taste.'],
    recipeYield: '6 servings',
    rating: 5
  }
]

export default recipes
