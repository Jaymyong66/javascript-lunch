import Restaurant, { IRestaurantInfo, ICategory } from './Restaurant';

export const SORT_CONDITION: readonly ('이름순' | '거리순')[] = Object.freeze(['이름순', '거리순']);

class RestaurantCatalog {
  #restaurants: Restaurant[] = [];

  pushNewRestaurant(restaurantInfo: IRestaurantInfo) {
    this.#restaurants.forEach((restaurant: Restaurant) => {
      if (restaurant.getInfo().name === restaurantInfo.name) {
        throw new Error('❌');
      }
    });

    const newRestaurant = new Restaurant(restaurantInfo);
    this.#restaurants.push(newRestaurant);
  }

  filterByCategory(category: ICategory) {
    return this.#restaurants.filter((restaurant) => restaurant.getInfo().category === category);
  }

  static sortByName(restaurants: IRestaurantInfo[]) {
    return restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.name < restaurantCurrent.name) return -1;
      return 1;
    });
  }

  static sortByDistance(restaurants: IRestaurantInfo[]) {
    return restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.distanceFromCampus !== restaurantCurrent.distanceFromCampus) {
        return restaurantPrev.distanceFromCampus - restaurantCurrent.distanceFromCampus;
      }
      return restaurantPrev.name.localeCompare(restaurantCurrent.name);
    });
  }

  getRestaurants() {
    return [...this.#restaurants];
  }
}

export default RestaurantCatalog;
