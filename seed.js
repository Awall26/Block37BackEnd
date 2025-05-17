require("dotenv").config();
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
    createUser({
      username: "user1",
      password: "password123",
      name: "John Doe",
      mailing_address: "123 Main St, Anytown, USA",
    }),
    createUser({
      username: "user2",
      password: "password123",
      name: "Jane Smith",
      mailing_address: "456 Oak Ave, Somewhere, USA",
      is_admin: true,
    }),
    createUser({
      username: "user3",
      password: "password123",
      name: "Bob Johnson",
      mailing_address: "789 Pine Rd, Nowhere, USA",
    }),
    createUser({
      username: "user4",
      password: "password123",
      name: "Alice Williams",
      mailing_address: "321 Elm St, Everywhere, USA",
    }),
    createUser({
      username: "user5",
      password: "password123",
      name: "Charlie Brown",
      mailing_address: "654 Maple Dr, Anywhere, USA",
    }),
    createUser({
      username: "user6",
      password: "password123",
      name: "Diana Ross",
      mailing_address: "987 Cedar Ln, Elsewhere, USA",
    }),
    createUser({
      username: "user7",
      password: "password123",
      name: "Edward Davis",
      mailing_address: "147 Birch Ct, Someplace, USA",
    }),
    createUser({
      username: "user8",
      password: "password123",
      name: "Fiona Green",
      mailing_address: "258 Willow Way, Otherplace, USA",
    }),
    createUser({
      username: "user9",
      password: "password123",
      name: "George Wilson",
      mailing_address: "369 Spruce St, Noplace, USA",
    }),
    createUser({
      username: "user10",
      password: "password123",
      name: "Helen Taylor",
      mailing_address: "741 Aspen Ave, Anyplace, USA",
    }),
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
      "https://www.gematsu.com/wp-content/uploads/2021/12/Game-Page-Box-Art_The-Legend-of-Zelda-Tears-of-the-Kingdom-Inits.jpg",
      69.99
    ),
    createProduct(
      "Marvel's Spider-Man 2",
      "Swing through New York City as Peter Parker and Miles Morales",
      "https://preview.redd.it/official-cover-art-for-spider-man-2-out-october-20-v0-a5h4887tvu4b1.jpg?auto=webp&s=0c1c3dcd37e39d1e4e61a73e735cfc6d7e5fccec",
      69.99
    ),
    createProduct(
      "Final Fantasy XVI",
      "Experience an epic dark fantasy adventure in the world of Valisthea",
      "https://i.redd.it/c5nkph1gajy91.jpg",
      69.99
    ),
    createProduct(
      "Starfield",
      "Bethesda's epic sci-fi RPG set among the stars",
      "https://bananaroad.com/cdn/shop/files/pst2792_Startfield_Video_Game_Poster_grande.jpg?v=1720812512",
      59.99
    ),
    createProduct(
      "Baldur's Gate 3",
      "Embark on a grand adventure in the Forgotten Realms",
      "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/08/baldurs-gate-3-box-art.jpg",
      59.99
    ),
    createProduct(
      "Resident Evil 4 Remake",
      "Survive horror in this reimagining of the classic game",
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/02/re4-remake-poster.jpg",
      59.99
    ),
    createProduct(
      "God of War Ragnarök",
      "Continue Kratos and Atreus's epic journey through Norse mythology",
      "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/12/mixcollage-08-dec-2024-01-22-pm-530.jpg",
      59.99
    ),
    createProduct(
      "Elden Ring",
      "Explore the Lands Between in this epic action RPG",
      "https://c.clc2l.com/t/E/l/Elden-Ring-l9wZ8Q.jpg",
      59.99
    ),
    createProduct(
      "Cyberpunk 2077",
      "Experience the dark future in Night City",
      "https://1.bp.blogspot.com/-LNZ2u6TKpSw/X09MidLRalI/AAAAAAAAJhA/-uELhTb088EbIlCzSBaHvDm3_Y7bNKhIQCLcBGAsYHQ/s640/cyberpunk-2077-box-art-01-ps4-us-06jun19.jpg",
      59.99
    ),
    createProduct(
      "Super Mario Bros. Wonder",
      "Join Mario in a new side-scrolling adventure",
      "https://sm.ign.com/ign_ap/cover/s/super-mari/super-mario-bros-wonder_w91b.jpg",
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
