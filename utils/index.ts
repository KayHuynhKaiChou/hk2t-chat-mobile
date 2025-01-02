import axios from "axios";

const svgToBase64 = (svgString: string) => {
  // Encode the SVG string to base64
  return btoa(encodeURIComponent(svgString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }))
};

/**
 * Fetches an array of 4 random avatars from the Multiavatar API.
 *
 * @returns {Promise<string[]>} An array of 4 base64 encoded strings, each representing a random avatar.
 */
export const patternAvatars = async (): Promise<string[]> => {
  const requests = Array.from({ length: 4 }, () => {
    const randomId = Math.round(Math.random() * 1000);
    return axios.get<string>(`https://api.multiavatar.com/4645646/${randomId}`);
  });

  const responses = await Promise.all(requests);
  const re = responses.map((response) => {
    const a = svgToBase64(response.data)
    return a
  });
  return re
};
