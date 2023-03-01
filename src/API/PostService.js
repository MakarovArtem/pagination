import axios from "axios";

export default class PostService {
  static async getAll(itemsLimit = 10, pageNumber = 1) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: itemsLimit,
        _page: pageNumber,
      }
    });
    return response;
  }
}