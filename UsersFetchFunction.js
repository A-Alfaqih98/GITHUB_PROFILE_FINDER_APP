const FetchUsers = async (forminput, API_KEY) => {
  try {
    console.log(API_KEY);
    const response = await fetch(
      `https://api.github.com/search/users?q=${forminput}`,
      {
        headers: {
          authorization: `token ${API_KEY}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default FetchUsers;
