const {
  client,
  createUser,
  createProduct,
  createTables,
  fetchUsers,
  fetchProducts,
  fetchUserCart,
  addToCart,
  removeFromCart,
  fetchSingleProduct,
  fetchSingleUser,
} = require("./db");

const seed = async () => {
  await client.connect();

  await createTables();
  console.log("Tables created");

  const [
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
  ] = await Promise.all([
    createUser("user1", "password123", "John Doe", "123 Main St, Anytown, USA"),
    createUser(
      "user2",
      "password123",
      "Jane Smith",
      "456 Oak Ave, Somewhere, USA"
    ),
    createUser(
      "user3",
      "password123",
      "Bob Johnson",
      "789 Pine Rd, Nowhere, USA"
    ),
    createUser(
      "user4",
      "password123",
      "Alice Williams",
      "321 Elm St, Everywhere, USA"
    ),
    createUser(
      "user5",
      "password123",
      "Charlie Brown",
      "654 Maple Dr, Anywhere, USA"
    ),
    createUser(
      "user6",
      "password123",
      "Diana Ross",
      "987 Cedar Ln, Elsewhere, USA"
    ),
    createUser(
      "user7",
      "password123",
      "Edward Davis",
      "147 Birch Ct, Someplace, USA"
    ),
    createUser(
      "user8",
      "password123",
      "Fiona Green",
      "258 Willow Way, Otherplace, USA"
    ),
    createUser(
      "user9",
      "password123",
      "George Wilson",
      "369 Spruce St, Noplace, USA"
    ),
    createUser(
      "user10",
      "password123",
      "Helen Taylor",
      "741 Aspen Ave, Anyplace, USA"
    ),
  ]);

  console.log("Users created:");
  console.log(await fetchUsers());

  const [
    zelda,
    spiderman,
    finalFantasy,
    starfield,
    baldursGate,
    residentEvil,
    godOfWar,
    eldenRing,
    cyberpunk,
    mario,
  ] = await Promise.all([
    createProduct(
      "The Legend of Zelda: Tears of the Kingdom",
      "Embark on an epic adventure across the land and skies of Hyrule",
      "https://placehold.co/400x600?text=Zelda:TOTK",
      69.99
    ),
    createProduct(
      "Marvel's Spider-Man 2",
      "Swing through New York City as Peter Parker and Miles Morales",
      "https://placehold.co/400x600?text=Spider-Man2",
      69.99
    ),
    createProduct(
      "Final Fantasy XVI",
      "Experience an epic dark fantasy adventure in the world of Valisthea",
      "https://placehold.co/400x600?text=FFXVI",
      69.99
    ),
    createProduct(
      "Starfield",
      "Bethesda's epic sci-fi RPG set among the stars",
      "https://placehold.co/400x600?text=Starfield",
      59.99
    ),
    createProduct(
      "Baldur's Gate 3",
      "Embark on a grand adventure in the Forgotten Realms",
      "https://placehold.co/400x600?text=BG3",
      59.99
    ),
    createProduct(
      "Resident Evil 4 Remake",
      "Survive horror in this reimagining of the classic game",
      "https://placehold.co/400x600?text=RE4",
      59.99
    ),
    createProduct(
      "God of War Ragnarök",
      "Continue Kratos and Atreus's epic journey through Norse mythology",
      "https://placehold.co/400x600?text=GOW",
      59.99
    ),
    createProduct(
      "Elden Ring",
      "Explore the Lands Between in this epic action RPG",
      "https://placehold.co/400x600?text=EldenRing",
      59.99
    ),
    createProduct(
      "Cyberpunk 2077",
      "Experience the dark future in Night City",
      "https://placehold.co/400x600?text=CP2077",
      59.99
    ),
    createProduct(
      "Super Mario Bros. Wonder",
      "Join Mario in a new side-scrolling adventure",
      "https://placehold.co/400x600?text=MarioWonder",
      59.99
    ),
  ]);

  console.log("Products created:");
  console.log(await fetchProducts());

  await client.end();
};

seed().catch((error) => {
  console.error("Error seeding database:", error);
});
