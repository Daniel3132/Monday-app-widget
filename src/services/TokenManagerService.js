class TokenManagerService {
  constructor(monday) {
    this.monday = monday;
  }

  async getTokenFromJSON() {
    try {
      const tokenData = await import("../token.json");
      return tokenData.token;
    } catch (error) {
      console.error('Error reading token from file:', error.message);
    }
  }

  setTokenInMonday(token) {
    if (token && typeof token === 'string') {
      this.monday.setToken(token);
    } else {
      console.error('Invalid token format.');
    }
  }

  async processToken() {
    try {
      const token = await this.getTokenFromJSON();
      if (token) {
        this.setTokenInMonday(token);
      } else {
        console.error('Token not found in the file.');
      }
    } catch (error) {
      console.error('Error processing token:', error.message);
    }
  }
}

export default TokenManagerService;
