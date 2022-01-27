/*
 * Mirage JS guide on Seeds: https://miragejs.com/docs/data-layer/factories#in-development
 */

const moviesSeeder = (server) => {
  /*
   * This will create in the in memory DB 10 objects
   * of the Factory `user`. Moreover it creates a
   * random number of messages and assign to each
   * and every user, making use of relationships.
   */
  server.createList('movie', 10);
};

// const productsSeeder = (server) => {
//   server.createList('product', 25);
// };

export default function seeds(server) {
  moviesSeeder(server);
  // productsSeeder(server);
}
